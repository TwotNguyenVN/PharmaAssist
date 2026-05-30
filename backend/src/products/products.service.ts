import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getFeaturedProducts() {
    // Query featured products (status = ACTIVE, productType = MEDICINE)
    const products = await this.prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        productType: 'MEDICINE',
      },
      take: 24, // Lấy 24 sản phẩm mẫu để hiển thị
      include: {
        category: true,
        variants: {
          where: { status: 'ACTIVE' },
          include: {
            unit: true,
          },
        },
        images: {
          take: 1,
        },
        medicines: {
          include: {
            dosageForm: true,
            ingredients: {
              include: {
                activeIngredient: true,
              },
            },
          },
        },
      },
    });

    // Map to client DTO
    return products.map((product) => {
      const firstVariant = product.variants[0];
      const medicineDetail = product.medicines[0];
      const imageUrl = product.images[0]?.imageUrl || '';

      const activeIngredients = medicineDetail?.ingredients
        ?.map((ing) => `${ing.activeIngredient.name} ${ing.strength}`)
        .join(', ') || '';

      return {
        id: product.code,
        dbId: product.id,
        name: product.name,
        category: product.category.name,
        price: firstVariant ? Number(firstVariant.sellingPrice) : 0,
        unit: firstVariant?.unit?.name || 'viên',
        isAvailable: firstVariant ? firstVariant.status === 'ACTIVE' : false,
        activeIngredient: activeIngredients || product.name,
        dosageForm: medicineDetail?.dosageForm?.name || 'Viên nén',
        description: product.description || product.shortDescription || 'Chưa có mô tả chi tiết.',
        usage: medicineDetail?.usageNote || 'Uống theo chỉ dẫn của dược sĩ.',
        imageUrl,
      };
    });
  }

  async getCategories() {
    // Fetch categories that have active products
    const categories = await this.prisma.productCategory.findMany({
      where: { status: 'ACTIVE' },
      take: 12,
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return categories.map((cat) => ({
      id: cat.code,
      name: cat.name,
      count: cat._count.products,
    }));
  }
}
