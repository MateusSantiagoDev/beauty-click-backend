import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LoginRepository } from './repository/login-repository';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [LoginService, LoginRepository],
})
export class LoginModule {}
