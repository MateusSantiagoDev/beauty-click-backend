import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ExceptionType, IException } from './exceptions-protocols';

export function HandleExceptions({ exceptionType, message }: IException) {
  if (
    exceptionType === ExceptionType.InvalidData ||
    exceptionType === ExceptionType.NotFundData
  ) {
    throw new BadRequestException(message ? message : 'Dados invalidos');
  }

  if (exceptionType === ExceptionType.UnauthorizedException) {
    throw new UnauthorizedException(
      message
        ? message
        : 'Você não tem permissão para realizar esta ação | Conta de usuário j[á existe no sistema',
    );
  }

  if (exceptionType === ExceptionType.NotFundexception) {
    throw new NotFoundException(message ? message : 'Registro não encontrado');
  }

  if (exceptionType === ExceptionType.UnprocessableEntityException) {
    throw new UnprocessableEntityException(
      message ? message : 'Algun erro ocorreu ao executar a operação',
    );
  }

  if (exceptionType === ExceptionType.InternalServerErrorException) {
    throw new InternalServerErrorException(
      message ? message : 'Erro inesperado no Servidor',
    );
  }
}
