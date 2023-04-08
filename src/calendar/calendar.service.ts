import { Injectable } from "@nestjs/common";
import { CalendarRepository } from "./repository/calendar-repository";

@Injectable()
export class CalendarService {
    constructor(private readonly repository: CalendarRepository) {}
}