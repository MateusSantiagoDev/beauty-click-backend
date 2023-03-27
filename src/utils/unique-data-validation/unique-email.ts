import { SignupService } from '../../signup/signup.service';
import { Exceptions } from '../exceptions/exception';
import { ExceptionType } from '../exceptions/exceptions-protocols';

export function ValidationEmail(
  signup: SignupService,
  email: string,
): Promise<boolean> {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Exceptions(ExceptionType.InvalidData, ` O email: ${email} é invalido`)
  }
  const signupEmail = signup.findByEmail(email);
  if (signupEmail) {
    throw new Exceptions(ExceptionType.NotFundData, `O Email: ${email} já está sendo utilizado`);
  }
  return new Promise((resolve) => resolve(false));
}
