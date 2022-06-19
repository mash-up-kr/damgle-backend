import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { setupSwagger } from './core/docs';

export async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
  });
  app.setGlobalPrefix('/v1/namepicker');
  setupSwagger(app);
  await app.init();

  return { app, instance: app.getHttpAdapter().getInstance() };
}
