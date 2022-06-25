import { Module } from '@nestjs/common';
import { GoogleSheetModule } from '../google-sheet/google-sheet.module';
import { NamePickerController } from './name-picker.controller';
import { NamePickerService } from './name-picker.service';

@Module({
  imports: [GoogleSheetModule],
  providers: [NamePickerService],
  controllers: [NamePickerController],
})
export class NamePickerModule {}
