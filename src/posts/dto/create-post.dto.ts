import { PickType } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { Post } from '../schemas/post.schema';

export class CreatePostDto extends PickType(Post, [
  'title',
  'content',
  'tags',
] as const) {
  @IsNotEmpty()
  content: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  tags: string[];
}
