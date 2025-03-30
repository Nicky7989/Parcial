import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTest } from './product-test.entity';
import { ProductTestDto } from './dto/product-tests.dto';
import { MakeupStock } from '../makeup-stock/makeup-stock.entity';

@Injectable()
export class ProductTestsService {
  constructor(
    @InjectRepository(ProductTest)
    private readonly productTestRepository: Repository<ProductTest>,

    @InjectRepository(MakeupStock)
    private readonly makeupStockRepository: Repository<MakeupStock>,
  ) {}

  async getAllTests(): Promise<ProductTest[]> {
    return this.productTestRepository.find({ relations: ['product'] });
  }

  async getTestById(id: string): Promise<ProductTest> {
    const test = await this.productTestRepository.findOne({ where: { id }, relations: ['product'] });
    if (!test) throw new NotFoundException(`❌ Prueba con ID ${id} no encontrada.`);
    return test;
  }

  async addTest(createTestDto: ProductTestDto): Promise<ProductTest> {
    const product = await this.makeupStockRepository.findOne({ where: { id: createTestDto.productId } });

    if (!product) {
      throw new NotFoundException(`❌ Producto con ID ${createTestDto.productId} no encontrado.`);
    }

    const newTest = this.productTestRepository.create({
      ...createTestDto,
      product,
    });

    return this.productTestRepository.save(newTest);
  }

  async updateTest(id: string, updateDto: Partial<ProductTestDto>): Promise<ProductTest> {
    const test = await this.getTestById(id);

    Object.assign(test, updateDto); 

    return this.productTestRepository.save(test);
  }

  async removeTest(id: string): Promise<void> {
    const result = await this.productTestRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`❌ Prueba con ID ${id} no encontrada.`);
    }
  }
}
