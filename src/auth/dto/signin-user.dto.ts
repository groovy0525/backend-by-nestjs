import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.schema';

export class SignInUserDto extends PickType(User, [
  'username',
  'password',
] as const) {}
