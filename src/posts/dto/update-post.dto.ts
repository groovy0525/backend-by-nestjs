import { PartialType } from '@nestjs/swagger';
import { Post } from '../schemas/post.schema';

export class UpdatePostDto extends PartialType(Post) {}
