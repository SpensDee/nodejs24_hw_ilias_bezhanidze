import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerIpMiddleware } from './middleware/logger-ip.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(new LoggerIpMiddleware().use);
  app.setGlobalPrefix('api');
  await app.listen(3300);
}
bootstrap();
