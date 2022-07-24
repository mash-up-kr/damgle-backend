import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'report', timestamps: { currentTime: () => Date.now() } })
export class Report {
  @Prop()
  userNo: number;

  @Prop()
  storyId: string; // objectId

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;
}
export type ReportDocument = Report & Document;

export const ReportSchema = SchemaFactory.createForClass(Report);
