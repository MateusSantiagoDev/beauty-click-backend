import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LoginRepository } from './repository/login-repository';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // secrete e tempo q o token será valido
  imports: [PrismaModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '24h' },
  })],
  controllers: [LoginController],
  providers: [LoginService, LoginRepository],
})
export class LoginModule {}
