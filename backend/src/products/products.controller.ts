import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('featured')
  getFeaturedProducts() {
    return this.productsService.getFeaturedProducts();
  }

  @Get('categories')
  getCategories() {
    return this.productsService.getCategories();
  }
}
