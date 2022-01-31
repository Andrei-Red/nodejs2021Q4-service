import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenDto } from './dto/token.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { checkHash } from '../helpers/bcryptHash';
import { CustomError } from '../helpers/CustomError';

@Injectable()
export class LoginService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(login: string, password: string): Promise<TokenDto> {
    const user = await this.userService.findByLogin(login);

    if (!user) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        `Not correct user id: ${login}`
      );
    }

    const isCorrectPass = checkHash(password, user.password ?? '');

    if (!isCorrectPass) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign({ id: user.id, login: user.login });
    return { message: 'User Authorized', token };
  }
}
