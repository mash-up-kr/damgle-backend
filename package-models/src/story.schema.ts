import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'story', timestamps: true })
export class Story {
  @Prop({ index: true, unique: true })
  userNo: number;

  @Prop()
  nickname: string;

  @Prop()
  refreshToken: string;

  @Prop()
  location: {
    type: 'Point';
    coordinates: [longitude: number, latitude: number];
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type StoryDocument = Story & Document;

export const StorySchema = SchemaFactory.createForClass(Story);
