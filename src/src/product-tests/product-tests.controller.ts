import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { ProductTestsService } from './product-tests.service';
import { ProductTest } from './product-test.interface';

@Controller('product-tests')
export class ProductTestsController {
  constructor(private readonly productTestsService: ProductTestsService) {}

  @Get()
  getAll() {
    return this.productTestsService.getAllTests();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productTestsService.getTestById(id);
  }

  @Post()
  addTest(@Body() test: Omit<ProductTest, 'id' | 'testerId'>) {
    console.log(`📢 Recibiendo prueba para producto ID: ${test.productId}`);

    if (!test.productId) {
      throw new BadRequestException('❌ Error: El campo "productId" es obligatorio.');
    }

    if (!test.rating || isNaN(Number(test.rating)) || test.rating < 1 || test.rating > 10) {
      throw new BadRequestException('❌ Error: "rating" debe ser un número entero entre 1 y 10.');
    }

    return this.productTestsService.addTest(test);
  }

  @Delete(':id')
  removeTest(@Param('id', ParseUUIDPipe) id: string) {
    this.productTestsService.removeTest(id);
    return { message: 'Prueba eliminada' };
  }
}
