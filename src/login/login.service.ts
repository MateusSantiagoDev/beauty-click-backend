import { Injectable } from '@nestjs/common';
import { LoginRepository } from './repository/login-repository';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ValidationRequiredFields } from '../utils/helpers/required-fields';
import { Exceptions } from '../utils/exceptions/exception';
import { ExceptionType } from '../utils/exceptions/exceptions-protocols';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private readonly repository: LoginRepository,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const requiredFields = ['email', 'password'];

    ValidationRequiredFields(dto, requiredFields);
    
    const { email, password } = dto;
    const user = await this.repository.findOne(email);
    if (!user) {
      throw new Exceptions(
        ExceptionType.InternalServerErrorException,
        'Email e/ou senha Inválidos!',
      );
    }

    const isValidHash = await compare(password, user.password);
    if (!isValidHash) {
      throw new Exceptions(
        ExceptionType.UnauthorizedException,
        'Email e/ou senha Inválidos!',
      );
    }

    delete user.password;
    delete user.role;

    return {
      token: this.jwt.sign({ email }),
      user,
    };
  }
}
