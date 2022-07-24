import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'user' })
export class User {
  @Prop({ index: true, unique: true })
  userNo: number;

  @Prop()
  nickname: string;

  @Prop()
  refreshToken: string;
}
export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
