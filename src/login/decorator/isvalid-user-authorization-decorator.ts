import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';

export class IsValidUserAuthorization implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpRequest = context.switchToHttp().getRequest();
    const request = httpRequest.user;

    if (request.role !== 'user' && request.role !== 'serviceProvider') {
      throw new Exceptions(
        ExceptionType.UnauthorizedException,
        'Usuário não autorizado',
      );
    }
    delete request.role;
    delete request.password;
    return request;
  }
}
