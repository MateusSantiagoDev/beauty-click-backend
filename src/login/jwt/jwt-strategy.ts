import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginRepository } from '../repository/login-repository';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';

// função para extrair o token
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly repository: LoginRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ email }) {
    const user = await this.repository.findOne(email);
    if (!user) {
      throw new Exceptions(
        ExceptionType.UnauthorizedException,
        'Usuário não existe ou não está autenticado',
      );
    }
    delete user.password;
    return user;
  }
}
