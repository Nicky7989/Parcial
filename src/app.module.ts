import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MakeupStockModule } from './src/makeup-stock/makeup-stock.module';
import { ProductTestsModule } from './src/product-tests/product-tests.module';

@Module({
  imports: [MakeupStockModule, ProductTestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
