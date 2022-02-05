import { forwardRef, Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    ConfigModule.forRoot({envFilePath: '.env'}),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY
    }),
  ],
  exports: [LoginService, JwtModule],
})
export class LoginModule {}
