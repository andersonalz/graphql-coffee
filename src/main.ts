import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe() //set validationPipe and install class-validator and use them for validation request body
  )
  await app.listen(3000);
}
bootstrap();
