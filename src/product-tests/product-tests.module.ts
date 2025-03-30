import { Module } from '@nestjs/common';
import { ProductTestsService } from './product-tests.service';
import { ProductTestsController } from './product-tests.controller';
import { MakeupStockModule } from '../makeup-stock/makeup-stock.module';

@Module({
  imports: [MakeupStockModule],
  controllers: [ProductTestsController],
  providers: [ProductTestsService],
})
export class ProductTestsModule {}
