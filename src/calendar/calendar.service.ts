import { Injectable } from "@nestjs/common";

@Injectable()
export class CalendarService {
    constructor(private readonly repository) {}
}