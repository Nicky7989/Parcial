import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductTest } from './product-test.interface';
import { MakeupStockService } from '../makeup-stock/makeup-stock.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductTestsService {
  removeTest(id: string) {
    throw new Error('Method not implemented.');
  }
  getTestById(id: string) {
    throw new Error('Method not implemented.');
  }
  getAllTests() {
    throw new Error('Method not implemented.');
  }
  private tests: ProductTest[] = [];

  constructor(private readonly makeupStockService: MakeupStockService) {}

  addTest(test: Omit<ProductTest, 'id' | 'testerId'>): ProductTest {
    // Verificar si el producto existe en makeup-stock
    const product = this.makeupStockService.getById(test.productId);
    if (!product) {
      throw new NotFoundException(`❌ Error: Producto con ID ${test.productId} no encontrado en makeup-stock.`);
    }

    const newTest: ProductTest = {
      id: uuidv4(), // Genera un UUID único para la prueba
      testerId: uuidv4(), // Genera un UUID único para el tester
      ...test,
      rating: Math.floor(test.rating), // Asegura que sea un número entero
    };

    this.tests.push(newTest);
    console.log('🧪 Nueva prueba registrada:', newTest);

    return newTest;
  }
}
