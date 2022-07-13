import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'user' })
export class User {
  @Prop()
  userNo: number;

  @Prop()
  nickname: string;

  @Prop()
  refreshToken: string;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

@Schema({ collection: 'user' })
export class UserCollectionCounter {
  @Prop()
  key: string;

  @Prop()
  count: number;
}
export type UserCollectionCounterDocument = UserCollectionCounter & Document;
export const UserCollectionCounterSchema = SchemaFactory.createForClass(UserCollectionCounter);
