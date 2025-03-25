import { Module } from '@nestjs/common';
import { MakeupStockService } from './makeup-stock.service';
import { MakeupStockController } from './makeup-stock.controller';

@Module({
  controllers: [MakeupStockController],
  providers: [MakeupStockService],
  exports: [MakeupStockService],
})
export class MakeupStockModule {}