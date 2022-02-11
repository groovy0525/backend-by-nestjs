import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Post extends Document {
  @Prop({
    default: '제목 없음',
  })
  title: string;

  @Prop()
  content: string;

  @Prop([String])
  tags: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
