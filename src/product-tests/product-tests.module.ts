import { Module } from '@nestjs/common';
import { ProductTestsService } from './product-tests.service';
import { ProductTestsController } from './product-tests.controller';
import { MakeupStockModule } from '../makeup-stock/makeup-stock.module';
import { ProductTest } from './product-test.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [MakeupStockModule, TypeOrmModule.forFeature([ProductTest])],
  controllers: [ProductTestsController],
  providers: [ProductTestsService],
  exports: [TypeOrmModule],
})
export class ProductTestsModule {}
