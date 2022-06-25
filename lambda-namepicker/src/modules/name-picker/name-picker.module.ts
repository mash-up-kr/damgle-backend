import { Module } from '@nestjs/common';
import { NamePickerController } from './name-picker.controller';
import { NamePickerService } from './name-picker.service';

@Module({
  providers: [NamePickerService],
  controllers: [NamePickerController],
})
export class NamePickerModule {}
