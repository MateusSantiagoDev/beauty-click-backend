import { Controller } from "@nestjs/common";

@Controller()
export class ServicesController {
    constructor(private readonly service) {}
}