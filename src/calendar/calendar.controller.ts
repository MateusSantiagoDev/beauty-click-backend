import { Controller } from "@nestjs/common";

@Controller()
export class CalendarController {
    constructor(private readonly service) {}
}