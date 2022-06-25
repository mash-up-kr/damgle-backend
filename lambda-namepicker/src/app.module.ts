import { Module } from '@nestjs/common';
import { NamePickerController } from './name-picker.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [NamePickerController],
  providers: [AppService],
})
export class AppModule {}
