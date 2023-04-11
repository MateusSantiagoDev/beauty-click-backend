import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';

export class IsValidUserAuthorization implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpRequest = context.switchToHttp().getRequest();
    const request = httpRequest.user;

    if (request.user !== 'user' || request.user !== 'serviceProvider') {
      throw new Exceptions(
        ExceptionType.UnauthorizedException,
        'Usuário não autorizado',
      );
    }
    delete request.user.role;
    delete request.user.password;
    return request.user;
  }
}
