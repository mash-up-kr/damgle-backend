import { Module } from '@nestjs/common';
import { configModule } from './core/config';
import { GoogleSheetModule } from './modules/google-sheet/google-sheet.module';
import { NamePickerModule } from './modules/name-picker/name-picker.module';

@Module({
  imports: [configModule, NamePickerModule, GoogleSheetModule],
})
export class AppModule {}
