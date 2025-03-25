import { Injectable, NotFoundException } from '@nestjs/common';
import { MakeupProduct } from './makeup-product.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MakeupStockService {
  private products: MakeupProduct[] = [];

  getAll(): MakeupProduct[] {
    return this.products;
  }

  getById(id: string): MakeupProduct {
    const product = this.products.find((prod) => prod.id === id);
    if (!product) {
      console.log(`⚠️ Producto con ID ${id} no encontrado`);
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  addProduct(product: Omit<MakeupProduct, 'id'>): MakeupProduct {
    const newProduct: MakeupProduct = {
      id: uuidv4(), // Genera un UUID único
      ...product,
      stock: Math.floor(product.stock), // Asegura que sea un número entero
      durability: Math.floor(product.durability), // Asegura que sea entero
      isIllegal: product.isIllegal ?? false,
      stolenQuantity: product.stolenQuantity ?? 0,
    };

    this.products.push(newProduct);
    console.log('📝 Agregando producto:', newProduct);
    console.log('📦 Stock actualizado:', this.products);

    return newProduct;
  }

  removeProduct(id: string): void {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    const removedProduct = this.products.splice(index, 1)[0];
    console.log(`🗑 Producto eliminado: ${removedProduct.name}`);

    this.products.forEach((product) => {
      if (product.stock <= 5) {
        console.warn(`⚠️ ALERTA: El producto "${product.name}" tiene un stock bajo (${product.stock} unidades).`);
      }
    });
  }
  
  reportTheft(id: string, quantity: number): MakeupProduct {
    console.log(`📢 Buscando producto con ID: ${id}`);
    console.log(`📢 Cantidad de unidades reportadas como robadas: ${quantity}`);
  
    const product = this.products.find(prod => prod.id === id);
    if (!product) {
      console.error(`❌ Producto con ID ${id} no encontrado.`);
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  
    console.log(`✅ Producto encontrado:`, product);
  
    if (quantity < 0) {
      console.error(`❌ Error: La cantidad robada no puede ser negativa.`);
      throw new Error('La cantidad robada no puede ser negativa');
    }
  
    product.stolenQuantity += quantity;
    console.warn(`⚠️ ALERTA: Se han robado ${quantity} unidades de "${product.name}". Total robado: ${product.stolenQuantity}`);
    
    return product;
  }

  checkLowStock(threshold: number = 5): MakeupProduct[] {
    return this.products.filter(product => product.stock <= threshold);
  }

  getIllegalProducts(): MakeupProduct[] {
    return this.products.filter(product => product.isIllegal === true);
  }
}
