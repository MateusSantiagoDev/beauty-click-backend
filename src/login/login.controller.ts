import { Controller } from "@nestjs/common";

@Controller()
export class LoginController {
    constructor(private readonly service) {}
}