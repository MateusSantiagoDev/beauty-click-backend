import { Injectable } from "@nestjs/common";
import { LoginRepository } from './repository/login-repository';

@Injectable()
export class LoginService {
    constructor(private readonly repository: LoginRepository) {}
}