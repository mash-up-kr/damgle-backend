import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'story' })
export class Story {
  @Prop()
  storyNo: number;

  @Prop()
  nickname: string;

  @Prop()
  refreshToken: string;
}
export type StoryDocument = Story & Document;
export const StorySchema = SchemaFactory.createForClass(Story);

@Schema({ collection: 'story' })
export class StoryCollectionCounter {
  @Prop()
  key: string;

  @Prop()
  count: number;
}
export type StoryCollectionCounterDocument = StoryCollectionCounter & Document;
export const StoryCollectionCounterSchema = SchemaFactory.createForClass(StoryCollectionCounter);
