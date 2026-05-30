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
  console.log('=== VERIFYING CRAWLED DATA IMPORT ===\n');

  const tables = [
    { name: 'countries', model: 'country' },
    { name: 'medicine_units', model: 'medicineUnit' },
    { name: 'dosage_forms', model: 'dosageForm' },
    { name: 'brands', model: 'brand' },
    { name: 'manufacturers', model: 'manufacturer' },
    { name: 'product_categories', model: 'productCategory' },
    { name: 'category_closures', model: 'categoryClosure' },
    { name: 'active_ingredients', model: 'activeIngredient' },
    { name: 'products', model: 'product' },
    { name: 'product_variants', model: 'productVariant' },
    { name: 'product_prices', model: 'productPrice' },
    { name: 'product_images', model: 'productImage' },
    { name: 'medicines', model: 'medicine' },
    { name: 'medicine_ingredients', model: 'medicineIngredient' },
    { name: 'product_documents', model: 'productDocument' },
  ];

  console.log('| Table Name | Row Count |');
  console.log('|------------|-----------|');
  
  for (const table of tables) {
    try {
      const count = await (prisma as any)[table.model].count();
      console.log(`| ${table.name.padEnd(20)} | ${count.toString().padStart(9)} |`);
    } catch (err: any) {
      console.log(`| ${table.name.padEnd(20)} | ERROR: ${err.message} |`);
    }
  }

  console.log('\n=== Integrity Checks ===');

  const dbProducts = await prisma.product.findMany({ select: { id: true, code: true } });
  const productCodeMap = new Map<string, number>(dbProducts.map(p => [p.code, p.id]));
  console.log(`Products in DB: ${dbProducts.length}`);

  // Inspect variants in CSV vs DB
  const variantsFile = path.join(CSV_DIR, 'product_variants.csv');
  let csvVariantCount = 0;
  let csvVariantsWithValidProduct = 0;
  const csvSkus = new Set<string>();
  const duplicateSkusInCsv = new Set<string>();

  await readCSV(variantsFile, async (row) => {
    csvVariantCount++;
    const productId = productCodeMap.get(row.product_code);
    if (productId !== undefined) {
      csvVariantsWithValidProduct++;
      const sku = row.sku || `SKU-${row.variant_code}`;
      if (csvSkus.has(sku)) {
        duplicateSkusInCsv.add(sku);
      }
      csvSkus.add(sku);
    }
  });

  console.log(`Variants in CSV: ${csvVariantCount}`);
  console.log(`Variants in CSV with valid product_code in DB: ${csvVariantsWithValidProduct}`);
  console.log(`Unique SKUs in CSV matching valid products: ${csvSkus.size}`);
  console.log(`Duplicate SKUs in CSV matching valid products: ${duplicateSkusInCsv.size}`);
  if (duplicateSkusInCsv.size > 0) {
    console.log(`Sample duplicates: ${Array.from(duplicateSkusInCsv).slice(0, 5).join(', ')}`);
  }

  // Check products missing variants
  const dbVariants = await prisma.productVariant.findMany({ select: { productId: true } });
  const variantProductIds = new Set(dbVariants.map(v => v.productId));
  const productsMissingVariants = dbProducts.filter(p => !variantProductIds.has(p.id)).length;
  console.log(`Products missing variants in DB: ${productsMissingVariants}`);

  // Products with documents summary
  const dbDocuments = await prisma.productDocument.findMany({ select: { productId: true } });
  const docProductIds = new Set(dbDocuments.map(d => d.productId));
  console.log(`Unique products with documents: ${docProductIds.size} / ${dbProducts.length}`);
}

main()
  .catch((e) => {
    console.error('Error during verification:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
