import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastify } from 'fastify';
import { AppModule } from './app.module';

export async function bootstrap() {
  const logger = new Logger();
  const instance = fastify();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(instance), {
    logger,
  });
  app.setGlobalPrefix('/namepicker');
  await app.init();

  return { app, instance };
}
