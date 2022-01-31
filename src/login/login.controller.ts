import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async checkUser(@Body() authLoginDto: AuthLoginDto) {
    const { login, password } = authLoginDto;

    try {
      return await this.loginService.login(login, password);
    } catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.FORBIDDEN);
    }
  }
}
