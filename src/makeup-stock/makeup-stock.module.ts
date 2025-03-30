import { Module } from '@nestjs/common';
import { MakeupStockService } from './makeup-stock.service';
import { MakeupStockController } from './makeup-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MakeupStock } from './makeup-stock.entity';

@Module({
  controllers: [MakeupStockController],
  providers: [MakeupStockService],
  imports: [TypeOrmModule.forFeature([MakeupStock])],
  exports: [TypeOrmModule],
})
export class MakeupStockModule {}