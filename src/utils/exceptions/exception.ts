import { ExceptionType, IException } from './exceptions-protocols';

export class Exceptions implements IException {
  constructor(
    readonly exceptionType: ExceptionType,
    readonly message?: string,
  ) {}
}
