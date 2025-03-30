import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MakeupStock } from './makeup-stock/makeup-stock.entity';
import { ProductTest } from './product-tests/product-test.entity';
import { MakeupStockModule } from './makeup-stock/makeup-stock.module';
import { ProductTestsModule } from './product-tests/product-tests.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([MakeupStock, ProductTest]),
    MakeupStockModule,
    ProductTestsModule,
  ],
})
export class AppModule {}
