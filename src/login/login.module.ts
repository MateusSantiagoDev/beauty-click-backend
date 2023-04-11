import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LoginRepository } from './repository/login-repository';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt/jwt-strategy';

@Module({
  imports: [PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '24h' },
  })],
  controllers: [LoginController],
  providers: [LoginService, LoginRepository, JwtStrategy],
})
export class LoginModule {}
