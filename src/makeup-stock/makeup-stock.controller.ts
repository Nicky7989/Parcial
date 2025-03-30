import { 
    Controller, Get, Post, Delete, Param, Body, Patch, ParseIntPipe, ParseUUIDPipe, BadRequestException 
  } from '@nestjs/common';
  import { MakeupStockService } from './makeup-stock.service';
  import { MakeupStockDto } from './dto/makeup-stock.dto';
  import { UpdateMakeupStockDto } from './dto/update-makeup-stock.dto';
  import { MakeupStock } from './makeup-stock.entity';
  
  @Controller('makeup-stock')
  export class MakeupStockController {
    constructor(private readonly makeupStockService: MakeupStockService) {}
  
    @Get()
    async getAll(): Promise<MakeupStock[]> {
      return await this.makeupStockService.getAll();
    }
  
    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string): Promise<MakeupStock> {
      return await this.makeupStockService.getById(id);
    }
  
    @Post()
    async addProduct(@Body() productDto: MakeupStockDto): Promise<MakeupStock> {
      if (!productDto.name || productDto.stock === undefined) {
        throw new BadRequestException('❌ Error: El nombre y el stock son obligatorios.');
      }
      
      const productData: Omit<MakeupStock, 'id'> = {
        ...productDto,
        category: productDto.category || 'default-category',
        stock: productDto.stock,
        storageLocation: productDto.storageLocation || 'default-location',
        durability: productDto.durability || 0,
        isIllegal: false,
        stolenQuantity: 0,
        tests: []
      };
      return await this.makeupStockService.addProduct(productData);
    }
  
    @Delete(':id')
    async removeProduct(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
      await this.makeupStockService.removeProduct(id);
      return { message: '🗑 Producto eliminado correctamente.' };
    }
  
    @Post(':id/report-theft')
    async reportTheft(
      @Param('id', ParseUUIDPipe) id: string,
      @Body('quantity', ParseIntPipe) quantity: number,
    ): Promise<MakeupStock> {
      if (quantity <= 0) {
        throw new BadRequestException('❌ Error: "quantity" debe ser mayor que 0.');
      }
  
      return await this.makeupStockService.reportTheft(id, quantity);
    }
  
    @Get('low-stock/:threshold')
    async getLowStock(@Param('threshold', ParseIntPipe) threshold: number): Promise<MakeupStock[]> {
      return await this.makeupStockService.checkLowStock(threshold);
    }
  
    @Get('illegal')
    async getIllegalProducts(): Promise<MakeupStock[]> {
      return await this.makeupStockService.getIllegalProducts();
    }

    @Patch(':id')
    async updateProduct(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateDto: UpdateMakeupStockDto,
    ): Promise<MakeupStock> {
      return await this.makeupStockService.updateProduct(id, updateDto);
    }
  }
  
