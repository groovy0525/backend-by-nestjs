import { PickType } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class ResponseUserDto extends PickType(User, [
  'id',
  'username',
  'createdAt',
] as const) {}
