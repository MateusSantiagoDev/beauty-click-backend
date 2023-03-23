import { Controller } from "@nestjs/common";
import { SignupService } from "./signup.service";

@Controller()
export class SignupController {
    constructor (private readonly service: SignupService) {}
}