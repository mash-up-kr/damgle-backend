import { staticEnv } from '@damgle/utils';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheableModule } from './core/cache';
import { configModule } from './core/config';
import { NamePickerModule } from './modules/name-picker/name-picker.module';

@Module({
  imports: [
    configModule,
    CacheableModule,
    MongooseModule.forRoot(
      staticEnv.mongodb_url.replace('{{password}}', staticEnv.mongodb_password),
      { dbName: staticEnv.mongodb_database }
    ),
    NamePickerModule,
  ],
})
export class AppModule {}
