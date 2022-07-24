import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module';
import { setupSwagger } from './core/docs';
import { initSentry, staticEnv, withSentryCaptured } from '@damgle/utils';

initSentry();
withSentryCaptured(() => require('pretty-error').start());
withSentryCaptured(() =>
  staticEnv.require(
    // fill static environment variable to use
    'cdn_host',
    'mongodb_url',
    'mongodb_password',
    'mongodb_database',
    'jwt_secret'
  )
);

export async function bootstrap() {
  const logger = new Logger();
  const instance = express();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(instance),
    {
      logger,
    }
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.setGlobalPrefix('/v1/auth');
  setupSwagger(app);
  await app.init();

  return { app, instance };
}
