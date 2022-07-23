import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';

@Module({
  providers: [StoryService],
  controllers: [StoryController],
})
export class StoryModule {}
