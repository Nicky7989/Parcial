import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { MakeupStockService } from './makeup-stock.service';
import { MakeupProduct } from './makeup-product.interface';

@Controller('makeup-stock')
export class MakeupStockController {
  constructor(private readonly makeupStockService: MakeupStockService) {}

  @Get()
  getAll() {
    return this.makeupStockService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.makeupStockService.getById(id);
  }

  @Post()
  addProduct(@Body() product: Omit<MakeupProduct, 'id'>) {
    return this.makeupStockService.addProduct(product);
  }

  @Delete(':id')
  removeProduct(@Param('id', ParseUUIDPipe) id: string) {
    this.makeupStockService.removeProduct(id);
    return { message: 'Producto eliminado' };
  }
  
  @Get('low-stock/:threshold')
  getLowStock(@Param('threshold', ParseIntPipe) threshold: number) {
    return this.makeupStockService.checkLowStock(threshold);
  }

  @Post('theft/:id')
  reportTheft(
    @Param('id', ParseUUIDPipe) id: string, // Cambiado a UUID
    @Body('quantity') quantity: any
  ) {
    console.log(`📢 ID recibido: ${id}, Quantity recibido:`, quantity);

    if (quantity === undefined || quantity === null) {
      throw new BadRequestException('❌ Error: El campo "quantity" es obligatorio.');
    }

    const quantityNumber = Number(quantity); // Convertir manualmente a número

    if (isNaN(quantityNumber) || quantityNumber <= 0) {
      throw new BadRequestException('❌ Error: "quantity" debe ser un número válido y mayor que 0.');
    }

    return this.makeupStockService.reportTheft(id, quantityNumber);
  }

  @Get('illegal')
  getIllegalProducts() {
    return this.makeupStockService.getIllegalProducts();
  }
}
