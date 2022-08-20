import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Reaction, ReactionType } from './reaction.type';

@Schema({ collection: 'story', timestamps: { currentTime: () => Date.now() } })
export class Story {
  @Prop({ index: true })
  userNo: number;

  @Prop()
  nickname: string;

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
  address1: string;

  @Prop()
  address2: string;

  @Prop({ userNo: { type: Number }, createdAt: { type: Number } })
  reports: { userNo: number; createdAt: number }[];

  @Prop()
  content: string;

  @Prop()
  reactions: Reaction[];

  @Prop()
  reactionOrder: ReactionType[];

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;
}

export type StoryDocument = Story & Document;

export const StorySchema = SchemaFactory.createForClass(Story);
