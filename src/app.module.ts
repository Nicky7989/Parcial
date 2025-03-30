import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MakeupStockModule } from './makeup-stock/makeup-stock.module';
import { ProductTestsModule } from './product-tests/product-tests.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';

@Module({
  
  imports: [MakeupStockModule, ProductTestsModule, OrdersModule, ConfigModule.forRoot(),//Me permite usar variables de entorno
    TypeOrmModule.forRoot({//Configuración de la base de datos
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, 
    }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
