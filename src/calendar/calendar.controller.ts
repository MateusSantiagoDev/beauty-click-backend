import { Controller } from "@nestjs/common";
import { CalendarService } from "./calendar.service";

@Controller()
export class CalendarController {
    constructor(private readonly service: CalendarService) {}
}