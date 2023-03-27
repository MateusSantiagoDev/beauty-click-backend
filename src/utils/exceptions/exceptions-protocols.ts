export enum ExceptionType {
  InvalidData,
  NotFundData,
  InternalServerErrorException,
  UnauthorizedException,
  NotFundexception,
  UnprocessableEntityException,
}

export interface IException {
  message?: string;
  exceptionType: ExceptionType;
}
