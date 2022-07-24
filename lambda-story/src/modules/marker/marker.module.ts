import { Module } from '@nestjs/common';
import { MarkerController } from './marker.controller';
import { MarkerService } from './marker.service';

@Module({
  providers: [MarkerService],
  controllers: [MarkerController],
})
export class MarkerModule {}
