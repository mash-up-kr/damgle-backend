import { Module } from '@nestjs/common';
import { configModule } from './core/config';
import { NamePickerModule } from './modules/name-picker/name-picker.module';

@Module({
  imports: [configModule, NamePickerModule],
})
export class AppModule {}
