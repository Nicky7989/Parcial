import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();//Que cualquier app pueda conectarse a mi app
  app.useGlobalPipes(//Validar los datos que llegan a la app
    new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    },
  ));

  app.enableCors();

  await app.listen(3000);
  console.log('🚀 Servidor corriendo en http://localhost:3000');
}

bootstrap();