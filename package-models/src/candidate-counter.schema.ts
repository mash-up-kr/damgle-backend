import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'namepicker' })
export class CandidateCounter {
  @Prop()
  key: string;

  @Prop()
  count: number;
}

export type CandidateCounterDocument = CandidateCounter & Document;

export const CandidateCounterSchema = SchemaFactory.createForClass(CandidateCounter);
