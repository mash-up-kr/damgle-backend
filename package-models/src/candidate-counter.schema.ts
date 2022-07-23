import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CandidateCounterDocument = CandidateCounter & Document;

@Schema({ collection: 'namepicker' })
export class CandidateCounter {
  @Prop()
  key: string;

  @Prop()
  count: number;
}

export const CandidateCounterSchema = SchemaFactory.createForClass(CandidateCounter);
