import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import * as readline from 'readline';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL || '';
if (!connectionString) {
  console.error('Error: DATABASE_URL or DIRECT_URL is missing.');
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const CSV_DIR = path.resolve(__dirname, '../../database/optimized');

export interface CSVRow {
  [key: string]: string;
}

// Custom state-machine CSV parser that handles newlines and quotes correctly
export async function readCSV(filePath: string, onRow: (row: CSVRow) => Promise<void>): Promise<void> {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let headers: string[] = [];
  let currentFields: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for await (const line of rl) {
    let i = 0;
    while (i < line.length) {
      const char = line[i];
      if (inQuotes) {
        if (char === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') {
            currentField += '"';
            i += 2;
            continue;
          } else {
            inQuotes = false;
          }
        } else {
          currentField += char;
        }
      } else {
        if (char === '"') {
          inQuotes = true;
        } else if (char === ',') {
          currentFields.push(currentField);
          currentField = '';
        } else {
          currentField += char;
        }
      }
      i++;
    }

    if (inQuotes) {
      currentField += '\n';
    } else {
      currentFields.push(currentField);
      currentField = '';
      if (headers.length === 0) {
        headers = currentFields.map((h) => h.trim());
      } else {
        const row: CSVRow = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j]] = currentFields[j] || '';
        }
        await onRow(row);
      }
      currentFields = [];
    }
  }
}

async function main() {
  console.log('--- Starting Crawled Data Import ---');
  console.log(`Reading CSV files from: ${CSV_DIR}`);

  // 1. Countries
  console.log('\n[1/15] Seeding countries...');
  const countriesFile = path.join(CSV_DIR, 'countries.csv');
  let countryCount = 0;
  await readCSV(countriesFile, async (row) => {
    await prisma.country.upsert({
      where: { code: row.country_code },
      update: { name: row.country_name },
      create: {
        code: row.country_code,
        name: row.country_name,
        status: 'ACTIVE',
      },
    });
    countryCount++;
  });
  console.log(`Seeded ${countryCount} countries.`);

  // Load countries map
  const countries = await prisma.country.findMany();
  const countryCodeMap = new Map<string, number>(countries.map((c) => [c.code, c.id]));

  // Ensure default country exists
  let defaultCountryId = countryCodeMap.get('CTY000002'); // Việt Nam
  if (!defaultCountryId && countries.length > 0) {
    defaultCountryId = countries[0].id;
  } else if (!defaultCountryId) {
    const defCountry = await prisma.country.create({
      data: { code: 'CTY_DEFAULT', name: 'Chưa xác định', status: 'ACTIVE' },
    });
    defaultCountryId = defCountry.id;
    countryCodeMap.set('CTY_DEFAULT', defaultCountryId);
  }

  // 2. Medicine Units
  console.log('\n[2/15] Seeding medicine units...');
  const unitsFile = path.join(CSV_DIR, 'medicine_units.csv');
  let unitCount = 0;
  await readCSV(unitsFile, async (row) => {
    await prisma.medicineUnit.upsert({
      where: { code: row.unit_code },
      update: { name: row.unit_name },
      create: {
        code: row.unit_code,
        name: row.unit_name,
      },
    });
    unitCount++;
  });
  console.log(`Seeded ${unitCount} medicine units.`);

  // Load units map
  const units = await prisma.medicineUnit.findMany();
  const unitCodeMap = new Map<string, number>(units.map((u) => [u.code, u.id]));

  // Ensure default unit exists
  let defaultUnitId = unitCodeMap.get('UNIT000001'); // Hộp/Chai...
  if (!defaultUnitId && units.length > 0) {
    defaultUnitId = units[0].id;
  } else if (!defaultUnitId) {
    const defUnit = await prisma.medicineUnit.create({
      data: { code: 'UNIT_DEFAULT', name: 'Đơn vị' },
    });
    defaultUnitId = defUnit.id;
    unitCodeMap.set('UNIT_DEFAULT', defaultUnitId);
  }

  // 3. Dosage Forms
  console.log('\n[3/15] Seeding dosage forms...');
  const dosageFormsFile = path.join(CSV_DIR, 'dosage_forms.csv');
  let dosageFormCount = 0;
  await readCSV(dosageFormsFile, async (row) => {
    await prisma.dosageForm.upsert({
      where: { code: row.dosage_form_code },
      update: { name: row.dosage_form_name },
      create: {
        code: row.dosage_form_code,
        name: row.dosage_form_name,
      },
    });
    dosageFormCount++;
  });
  console.log(`Seeded ${dosageFormCount} dosage forms.`);

  // Load dosage forms map
  const dosageForms = await prisma.dosageForm.findMany();
  const dosageFormCodeMap = new Map<string, number>(dosageForms.map((df) => [df.code, df.id]));

  // Ensure default/unknown dosage form exists (since some medicines have empty dosage form)
  let defaultDosageFormId = dosageFormCodeMap.get('DF_UNKNOWN');
  if (!defaultDosageFormId) {
    const defDf = await prisma.dosageForm.upsert({
      where: { code: 'DF_UNKNOWN' },
      update: {},
      create: {
        code: 'DF_UNKNOWN',
        name: 'Khác',
        description: 'Dosage form không xác định',
      },
    });
    defaultDosageFormId = defDf.id;
    dosageFormCodeMap.set('DF_UNKNOWN', defaultDosageFormId);
  }

  // 4. Brands
  console.log('\n[4/15] Seeding brands...');
  const brandsFile = path.join(CSV_DIR, 'brands.csv');
  let brandCount = 0;
  const processedBrandSlugs = new Set<string>();
  await readCSV(brandsFile, async (row) => {
    let slug = row.brand_slug;
    const originalSlug = slug;
    let suffix = 1;
    while (processedBrandSlugs.has(slug.toLowerCase())) {
      slug = `${originalSlug}-${row.brand_code.toLowerCase()}`;
      if (processedBrandSlugs.has(slug.toLowerCase())) {
        slug = `${originalSlug}-${row.brand_code.toLowerCase()}-${suffix++}`;
      }
    }
    processedBrandSlugs.add(slug.toLowerCase());

    await prisma.brand.upsert({
      where: { code: row.brand_code },
      update: { name: row.brand_name, slug: slug },
      create: {
        code: row.brand_code,
        name: row.brand_name,
        slug: slug,
        status: 'ACTIVE',
      },
    });
    brandCount++;
  });
  console.log(`Seeded ${brandCount} brands.`);

  // Load brands map
  const brands = await prisma.brand.findMany();
  const brandCodeMap = new Map<string, number>(brands.map((b) => [b.code, b.id]));

  // 5. Manufacturers
  console.log('\n[5/15] Seeding manufacturers...');
  
  // First, we need a map of manufacturer_code to country_code from products.csv
  const productsFileForMfr = path.join(CSV_DIR, 'products.csv');
  const mfrCountryMap = new Map<string, string>();
  await readCSV(productsFileForMfr, async (row) => {
    if (row.manufacturer_code && row.country_code) {
      mfrCountryMap.set(row.manufacturer_code, row.country_code);
    }
  });

  const manufacturersFile = path.join(CSV_DIR, 'manufacturers.csv');
  let manufacturerCount = 0;
  await readCSV(manufacturersFile, async (row) => {
    const countryCode = mfrCountryMap.get(row.manufacturer_code) || '';
    const countryId = countryCodeMap.get(countryCode) || defaultCountryId!;
    await prisma.manufacturer.upsert({
      where: { code: row.manufacturer_code },
      update: { name: row.manufacturer_name, countryId },
      create: {
        code: row.manufacturer_code,
        name: row.manufacturer_name,
        countryId,
        status: 'ACTIVE',
      },
    });
    manufacturerCount++;
  });
  console.log(`Seeded ${manufacturerCount} manufacturers.`);

  // Load manufacturers map
  const manufacturers = await prisma.manufacturer.findMany();
  const manufacturerCodeMap = new Map<string, number>(manufacturers.map((m) => [m.code, m.id]));

  // 6. Product Categories
  console.log('\n[6/15] Seeding product categories...');
  const categoriesFile = path.join(CSV_DIR, 'product_categories.csv');
  
  // We do a two-pass import to ensure parents are set up correctly
  const categoryRows: CSVRow[] = [];
  await readCSV(categoriesFile, async (row) => {
    categoryRows.push(row);
  });

  // Sort by level ascending so parent categories are created first
  categoryRows.sort((a, b) => parseInt(a.level || '1') - parseInt(b.level || '1'));

  const categoryCodeMap = new Map<string, number>();
  const processedCategorySlugs = new Set<string>();
  for (const row of categoryRows) {
    const parentId = row.parent_category_code ? categoryCodeMap.get(row.parent_category_code) || null : null;
    
    let slug = row.category_slug;
    const originalSlug = slug;
    let suffix = 1;
    while (processedCategorySlugs.has(slug.toLowerCase())) {
      slug = `${originalSlug}-${row.category_code.toLowerCase()}`;
      if (processedCategorySlugs.has(slug.toLowerCase())) {
        slug = `${originalSlug}-${row.category_code.toLowerCase()}-${suffix++}`;
      }
    }
    processedCategorySlugs.add(slug.toLowerCase());

    const cat = await prisma.productCategory.upsert({
      where: { code: row.category_code },
      update: { name: row.category_name, parentId, slug: slug },
      create: {
        code: row.category_code,
        name: row.category_name,
        slug: slug,
        parentId,
        status: 'ACTIVE',
      },
    });
    categoryCodeMap.set(row.category_code, cat.id);
  }
  console.log(`Seeded ${categoryCodeMap.size} categories.`);

  // 7. Category Closures
  console.log('\n[7/15] Seeding category closures...');
  const closuresFile = path.join(CSV_DIR, 'category_closures.csv');
  let closureCount = 0;
  const closuresData: { ancestorId: number; descendantId: number; depth: number }[] = [];
  
  await readCSV(closuresFile, async (row) => {
    const ancestorId = categoryCodeMap.get(row.ancestor_code);
    const descendantId = categoryCodeMap.get(row.descendant_code);
    const depth = parseInt(row.depth || '0');
    if (ancestorId !== undefined && descendantId !== undefined) {
      closuresData.push({ ancestorId, descendantId, depth });
    }
  });

  // Clear old closures before bulk seeding to avoid primary key conflicts
  await prisma.categoryClosure.deleteMany({});
  
  // Batch insert closures
  const closureBatchSize = 1000;
  for (let i = 0; i < closuresData.length; i += closureBatchSize) {
    const batch = closuresData.slice(i, i + closureBatchSize);
    await prisma.categoryClosure.createMany({
      data: batch,
      skipDuplicates: true,
    });
    closureCount += batch.length;
  }
  console.log(`Seeded ${closureCount} category closures.`);

  // 8. Active Ingredients
  console.log('\n[8/15] Seeding active ingredients...');
  await prisma.product.deleteMany({});
  await prisma.activeIngredient.deleteMany({});
  const ingredientsFile = path.join(CSV_DIR, 'active_ingredients.csv');
  const ingredientData: { code: string; name: string; description: string | null }[] = [];

  await readCSV(ingredientsFile, async (row) => {
    ingredientData.push({
      code: row.ingredient_code,
      name: row.ingredient_name,
      description: row.description || null,
    });
  });

  let ingredientCount = 0;
  const ingredientBatchSize = 1000;
  for (let i = 0; i < ingredientData.length; i += ingredientBatchSize) {
    const batch = ingredientData.slice(i, i + ingredientBatchSize);
    await prisma.activeIngredient.createMany({
      data: batch,
      skipDuplicates: true,
    });
    ingredientCount += batch.length;
  }
  console.log(`Seeded ${ingredientCount} active ingredients.`);

  // Load ingredients map
  const activeIngredients = await prisma.activeIngredient.findMany();
  const activeIngredientCodeMap = new Map<string, number>(activeIngredients.map((ai) => [ai.code, ai.id]));

  // 9. Products
  console.log('\n[9/15] Seeding products...');
  const productsFile = path.join(CSV_DIR, 'products.csv');
  const productRows: CSVRow[] = [];
  await readCSV(productsFile, async (row) => {
    productRows.push(row);
  });

  const processedProductSlugs = new Set<string>();
  const productData = productRows.map((row) => {
    const categoryId = categoryCodeMap.get(row.category_code) || 1; // Default to 1 if not found
    const brandId = row.brand_code ? brandCodeMap.get(row.brand_code) || null : null;
    const manufacturerId = row.manufacturer_code ? manufacturerCodeMap.get(row.manufacturer_code) || null : null;
    
    let slug = row.product_slug;
    const originalSlug = slug;
    let suffix = 1;
    while (processedProductSlugs.has(slug.toLowerCase())) {
      slug = `${originalSlug}-${row.product_code.toLowerCase()}`;
      if (processedProductSlugs.has(slug.toLowerCase())) {
        slug = `${originalSlug}-${row.product_code.toLowerCase()}-${suffix++}`;
      }
    }
    processedProductSlugs.add(slug.toLowerCase());

    return {
      code: row.product_code,
      name: row.product_name,
      slug: slug,
      categoryId,
      brandId,
      manufacturerId,
      productType: row.product_type || 'OTHER',
      shortDescription: row.short_description || null,
      status: 'ACTIVE',
    };
  });

  let productCount = 0;
  const productBatchSize = 1000;
  for (let i = 0; i < productData.length; i += productBatchSize) {
    const batch = productData.slice(i, i + productBatchSize);
    await prisma.product.createMany({
      data: batch,
      skipDuplicates: true,
    });
    productCount += batch.length;
  }
  console.log(`Seeded ${productCount} products.`);

  // Load products map
  const dbProducts = await prisma.product.findMany({ select: { id: true, code: true } });
  const productCodeMap = new Map<string, number>(dbProducts.map((p) => [p.code, p.id]));

  // 10. Product Variants & Prices
  console.log('\n[10/15] Seeding product variants & price lists...');
  
  // Ensure we have a default price list
  let priceList = await prisma.priceList.findUnique({ where: { code: 'DEFAULT' } });
  if (!priceList) {
    priceList = await prisma.priceList.create({
      data: {
        code: 'DEFAULT',
        name: 'Bảng giá mặc định',
        appliesTo: 'STORE',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2099-12-31'),
        status: 'ACTIVE',
      },
    });
  }

  // Load product prices file to build variant_code -> price mapping
  const pricesFile = path.join(CSV_DIR, 'product_prices.csv');
  const variantPricesMap = new Map<string, number>();
  await readCSV(pricesFile, async (row) => {
    const priceVal = parseFloat(row.price || '0');
    variantPricesMap.set(row.variant_code, priceVal);
  });

  // Load variants file
  const variantsFile = path.join(CSV_DIR, 'product_variants.csv');
  const variantRows: CSVRow[] = [];
  await readCSV(variantsFile, async (row) => {
    variantRows.push(row);
  });

  const variantCodeToSkuMap = new Map<string, string>();
  const processedSkus = new Set<string>();

  const variantData = variantRows.map((row) => {
    const productId = productCodeMap.get(row.product_code);
    const unitId = unitCodeMap.get(row.unit_code) || defaultUnitId!;
    const sellingPrice = variantPricesMap.get(row.variant_code) || 0;

    if (productId === undefined) {
      return null;
    }

    let sku = row.sku || `SKU-${row.variant_code}`;
    const originalSku = sku;
    let suffix = 1;
    while (processedSkus.has(sku.toLowerCase())) {
      sku = `${originalSku}-${row.variant_code.toLowerCase()}`;
      if (processedSkus.has(sku.toLowerCase())) {
        sku = `${originalSku}-${row.variant_code.toLowerCase()}-${suffix++}`;
      }
    }
    processedSkus.add(sku.toLowerCase());
    variantCodeToSkuMap.set(row.variant_code, sku);

    return {
      productId,
      sku,
      barcode: null,
      variantName: row.packaging_size || 'Mặc định',
      unitId,
      sellingPrice,
      status: 'ACTIVE',
    };
  }).filter((v): v is NonNullable<typeof v> => v !== null);

  let variantCount = 0;
  const variantBatchSize = 1000;
  for (let i = 0; i < variantData.length; i += variantBatchSize) {
    const batch = variantData.slice(i, i + variantBatchSize);
    await prisma.productVariant.createMany({
      data: batch,
      skipDuplicates: true,
    });
    variantCount += batch.length;
  }
  console.log(`Seeded ${variantCount} product variants.`);

  // Load product variants map by sku (since SKU is unique)
  const dbVariants = await prisma.productVariant.findMany({ select: { id: true, sku: true } });
  const variantSkuMap = new Map<string, number>(dbVariants.map((v) => [v.sku, v.id]));

  // Now create ProductPrice records
  console.log('\n[11/15] Seeding product prices...');
  const productPricesData: { priceListId: number; productVariantId: number; price: number; effectiveFrom: Date; effectiveTo: Date }[] = [];
  
  for (const row of variantRows) {
    const sku = variantCodeToSkuMap.get(row.variant_code);
    if (!sku) continue;
    const productVariantId = variantSkuMap.get(sku);
    const price = variantPricesMap.get(row.variant_code) || 0;

    if (productVariantId !== undefined) {
      productPricesData.push({
        priceListId: priceList.id,
        productVariantId,
        price,
        effectiveFrom: new Date('2020-01-01'),
        effectiveTo: new Date('2099-12-31'),
      });
    }
  }

  let priceCount = 0;
  const priceBatchSize = 1000;
  for (let i = 0; i < productPricesData.length; i += priceBatchSize) {
    const batch = productPricesData.slice(i, i + priceBatchSize);
    await prisma.productPrice.createMany({
      data: batch,
      skipDuplicates: true,
    });
    priceCount += batch.length;
  }
  console.log(`Seeded ${priceCount} product prices.`);

  // 12. Product Images
  console.log('\n[12/15] Seeding product images...');
  const imagesFile = path.join(CSV_DIR, 'product_images.csv');
  const imageData: { productId: number; imageUrl: string; isPrimary: boolean; sortOrder: number }[] = [];

  await readCSV(imagesFile, async (row) => {
    const productId = productCodeMap.get(row.product_code);
    if (productId !== undefined) {
      imageData.push({
        productId,
        imageUrl: row.image_url,
        isPrimary: row.is_primary === 'true',
        sortOrder: parseInt(row.display_order || '0'),
      });
    }
  });

  let imageCount = 0;
  const imageBatchSize = 5000;
  for (let i = 0; i < imageData.length; i += imageBatchSize) {
    const batch = imageData.slice(i, i + imageBatchSize);
    await prisma.productImage.createMany({
      data: batch,
      skipDuplicates: true,
    });
    imageCount += batch.length;
  }
  console.log(`Seeded ${imageCount} product images.`);

  // 13. Medicines
  console.log('\n[13/15] Seeding medicines...');
  const medicinesFile = path.join(CSV_DIR, 'medicines.csv');
  const medicineRows: CSVRow[] = [];
  await readCSV(medicinesFile, async (row) => {
    medicineRows.push(row);
  });

  // Map product code to base unit ID for medicine unit
  const productsFileForUnits = path.join(CSV_DIR, 'products.csv');
  const productUnitCodeMap = new Map<string, string>();
  await readCSV(productsFileForUnits, async (row) => {
    if (row.product_code && row.base_unit_code) {
      productUnitCodeMap.set(row.product_code, row.base_unit_code);
    }
  });

  const medicineData = medicineRows.map((row) => {
    const productId = productCodeMap.get(row.product_code);
    if (productId === undefined) {
      return null;
    }

    const dosageFormId = dosageFormCodeMap.get(row.dosage_form_code) || defaultDosageFormId!;
    const productUnitCode = productUnitCodeMap.get(row.product_code) || '';
    const medicineUnitId = unitCodeMap.get(productUnitCode) || defaultUnitId!;
    const shelfLifeMonths = row.shelf_life_months ? parseInt(row.shelf_life_months) : null;

    return {
      productId,
      medicineCode: `MED_${row.product_code}`,
      registrationNumber: row.registration_number || null,
      dosageFormId,
      medicineUnitId,
      requiresPrescription: row.requires_prescription === 'true',
      shelfLifeMonths,
      usageNote: null,
      storageInstruction: row.temperature_condition 
        ? `Nhiệt độ bảo quản: ${row.temperature_condition}`
        : null,
      status: 'ACTIVE',
    };
  }).filter((m): m is NonNullable<typeof m> => m !== null);

  let medicineCount = 0;
  const medicineBatchSize = 1000;
  for (let i = 0; i < medicineData.length; i += medicineBatchSize) {
    const batch = medicineData.slice(i, i + medicineBatchSize);
    await prisma.medicine.createMany({
      data: batch,
      skipDuplicates: true,
    });
    medicineCount += batch.length;
  }
  console.log(`Seeded ${medicineCount} medicines.`);

  // Load medicines map
  const dbMedicines = await prisma.medicine.findMany({ select: { id: true, productId: true } });
  // Map productId -> medicineId
  const productToMedicineIdMap = new Map<number, number>(dbMedicines.map((m) => [m.productId, m.id]));

  // 14. Medicine Ingredients
  console.log('\n[14/15] Seeding medicine ingredients...');
  const medIngredientsFile = path.join(CSV_DIR, 'medicine_ingredients.csv');
  const medIngredientData: { medicineId: number; activeIngredientId: number; strength: string; note: string | null }[] = [];

  await readCSV(medIngredientsFile, async (row) => {
    const productId = productCodeMap.get(row.product_code);
    if (productId === undefined) return;

    const medicineId = productToMedicineIdMap.get(productId);
    const activeIngredientId = activeIngredientCodeMap.get(row.ingredient_code);

    if (medicineId !== undefined && activeIngredientId !== undefined) {
      let strength = 'N/A';
      if (row.strength_value && row.strength_unit) {
        strength = `${row.strength_value}${row.strength_unit}`;
      } else if (row.strength_value) {
        strength = row.strength_value;
      }
      
      medIngredientData.push({
        medicineId,
        activeIngredientId,
        strength,
        note: null,
      });
    }
  });

  let medIngredientCount = 0;
  const medIngredientBatchSize = 5000;
  for (let i = 0; i < medIngredientData.length; i += medIngredientBatchSize) {
    const batch = medIngredientData.slice(i, i + medIngredientBatchSize);
    await prisma.medicineIngredient.createMany({
      data: batch,
      skipDuplicates: true,
    });
    medIngredientCount += batch.length;
  }
  console.log(`Seeded ${medIngredientCount} medicine ingredients.`);

  // 15. Product Documents
  console.log('\n[15/15] Seeding product documents...');
  const documentsFile = path.join(CSV_DIR, 'product_documents.csv');
  
  let documentCount = 0;
  let docBatch: { productId: number; documentType: string; content: string | null; title: string | null }[] = [];
  const docBatchSize = 10000;

  await readCSV(documentsFile, async (row) => {
    const productId = productCodeMap.get(row.product_code);
    if (productId !== undefined) {
      docBatch.push({
        productId,
        documentType: row.document_type || 'OVERVIEW',
        content: row.content || null,
        title: row.title || null,
      });

      if (docBatch.length >= docBatchSize) {
        await prisma.productDocument.createMany({
          data: docBatch,
          skipDuplicates: true,
        });
        documentCount += docBatch.length;
        process.stdout.write(`\rImported ${documentCount} documents...`);
        docBatch = [];
      }
    }
  });

  if (docBatch.length > 0) {
    await prisma.productDocument.createMany({
      data: docBatch,
      skipDuplicates: true,
    });
    documentCount += docBatch.length;
  }
  console.log(`\nSeeded ${documentCount} product documents.`);

  console.log('\n--- Seed Process Completed Successfully! ---');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
