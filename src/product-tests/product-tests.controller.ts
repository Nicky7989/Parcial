import { 
  Controller, Get, Post, Body, Param, Delete, Patch, ParseUUIDPipe, BadRequestException, NotFoundException 
} from '@nestjs/common';
import { ProductTestsService } from './product-tests.service';
import { ProductTestDto } from './dto/product-tests.dto';

@Controller('product-tests')
export class ProductTestsController {
  constructor(private readonly productTestsService: ProductTestsService) {}

  @Get()
  getAll() {
    return this.productTestsService.getAllTests();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    const test = await this.productTestsService.getTestById(id);
    if (!test) {
      throw new NotFoundException(`❌ Prueba con ID ${id} no encontrada.`);
    }
    return test;
  }

  @Post()
  async addTest(@Body() testDto: ProductTestDto) {
    console.log(`📢 Recibiendo prueba para producto ID: ${testDto.productId}`);

    if (!testDto.productId) {
      throw new BadRequestException('❌ Error: El campo "productId" es obligatorio.');
    }

    return await this.productTestsService.addTest(testDto);
  }

  @Patch(':id')
  async updateTest(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateDto: Partial<ProductTestDto>
  ) {
    return await this.productTestsService.updateTest(id, updateDto);
  }

  @Delete(':id')
  async removeTest(@Param('id', ParseUUIDPipe) id: string) {
    await this.productTestsService.removeTest(id);
    return { message: '🗑 Prueba eliminada correctamente.' };
  }
}
