import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module';
import { setupSwagger } from './core/docs';

export async function bootstrap() {
  const logger = new Logger();
  const instance = express();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(instance), {
    logger,
  });
  app.setGlobalPrefix('/v1/namepicker');
  setupSwagger(app);
  await app.init();

  return { app, instance };
}
