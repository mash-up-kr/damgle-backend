import { Story, StorySchema } from '@damgle/models';
import { JwtStrategy } from '@damgle/utils';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Story.name, schema: StorySchema }])],
  exports: [StoryService],
  providers: [StoryService, JwtStrategy],
  controllers: [StoryController],
})
export class StoryModule {}
