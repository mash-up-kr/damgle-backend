import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Reaction } from './reaction.type';

@Schema({ collection: 'story', timestamps: { currentTime: () => Date.now() } })
export class Story {
  @Prop({ index: true })
  userNo: number;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: 'Point';
    coordinates: [longitude: number, latitude: number];
  };

  @Prop()
  content: string;

  @Prop()
  reactions: Reaction[];

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;
}

export type StoryDocument = Story & Document;

export const StorySchema = SchemaFactory.createForClass(Story);
