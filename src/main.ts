import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerIpMiddleware } from './middleware/logger-ip.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggerIpMiddleware().use);
  await app.listen(3300);
}
bootstrap();
