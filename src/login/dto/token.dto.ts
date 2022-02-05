import { PartialType } from '@nestjs/mapped-types';
import { AuthLoginDto } from './auth-login.dto';

export class TokenDto extends PartialType(AuthLoginDto) {
  message!: string;
  token!: string;
}
