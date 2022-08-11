import { AllExceptionFilter, staticEnv } from '@damgle/utils';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheableModule } from './core/cache';
import { configModule } from './core/config';
import { ReportModule } from './modules/report/report.module';
import { StoryModule } from './modules/story/story.module';

@Module({
  imports: [
    configModule,
    CacheableModule,
    MongooseModule.forRoot(
      staticEnv.mongodb_url.replace('{{password}}', staticEnv.mongodb_password),
      { dbName: staticEnv.mongodb_database }
    ),
    StoryModule,
    ReportModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionFilter }],
})
export class AppModule {}
