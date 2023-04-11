import { Controller } from "@nestjs/common";
import { LoginService } from './login.service';

@Controller()
export class LoginController {
    constructor(private readonly service: LoginService) {}
}