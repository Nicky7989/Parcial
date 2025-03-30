import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { MakeupStock } from './makeup-stock.entity';

@Injectable()
export class MakeupStockService {
  constructor(
    @InjectRepository(MakeupStock)
    private readonly makeupStockRepository: Repository<MakeupStock>,
  ) {}

  async getAll(): Promise<MakeupStock[]> {
    return this.makeupStockRepository.find();
  }

  async getById(id: string): Promise<MakeupStock> {
    const product = await this.makeupStockRepository.findOne({ where: { id } });
    if (!product) {
      console.log(`⚠️ Producto con ID ${id} no encontrado`);
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async addProduct(productData: Omit<MakeupStock, 'id'>): Promise<MakeupStock> {
    const newProduct = this.makeupStockRepository.create(productData);
    return this.makeupStockRepository.save(newProduct);
  }

  async updateProduct(id: string, updateDto: Partial<MakeupStock>): Promise<MakeupStock> {
    const product = await this.makeupStockRepository.preload({ id, ...updateDto });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return this.makeupStockRepository.save(product);
  }

  async removeProduct(id: string): Promise<void> {
    const result = await this.makeupStockRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }

  async reportTheft(id: string, quantity: number): Promise<MakeupStock> {
    const product = await this.getById(id);

    if (quantity < 0) {
      throw new Error('❌ La cantidad robada no puede ser negativa');
    }

    product.stolenQuantity += quantity;
    console.warn(`⚠️ ALERTA: Se han robado ${quantity} unidades de "${product.name}". Total robado: ${product.stolenQuantity}`);

    return this.makeupStockRepository.save(product);
  }

  async checkLowStock(threshold: number = 5): Promise<MakeupStock[]> {
    return this.makeupStockRepository.find({ where: { stock: LessThanOrEqual(threshold) } });
  }

  async getIllegalProducts(): Promise<MakeupStock[]> {
    return this.makeupStockRepository.find({ where: { isIllegal: true } });
  }
}
