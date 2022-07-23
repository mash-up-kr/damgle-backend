import { CandidateCounter, CandidateCounterSchema } from '@damgle/models';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NamePickerController } from './name-picker.controller';
import { NamePickerService } from './name-picker.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CandidateCounter.name, schema: CandidateCounterSchema }]),
  ],
  providers: [NamePickerService],
  controllers: [NamePickerController],
})
export class NamePickerModule {}
