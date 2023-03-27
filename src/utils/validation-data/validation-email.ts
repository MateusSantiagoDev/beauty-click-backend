import { SignupService } from '../../signup/signup.service';

export class IsValidEmail {
  constructor(
    private readonly signup: SignupService,
    private readonly email: string,
  ) {}

  EmailRegex(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      return false;
    }
    return true;
  }

  async UniqueEmail(): Promise<boolean> {
    const isEmail = await this.signup.findByEmail(this.email);   
    return isEmail ? true : false;
  }
}
