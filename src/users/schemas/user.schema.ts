import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';
import { ResponseUserDto } from '../dto/response-user.dto';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
  })
  @IsNotEmpty()
  username: string;

  @Prop()
  @IsNotEmpty()
  password: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: number;

  readonly returnData: ResponseUserDto;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('returnData').get(function (this: User) {
  return {
    id: this.id,
    username: this.username,
    createdAt: this.createdAt,
  };
});
