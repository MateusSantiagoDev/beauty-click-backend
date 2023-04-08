import { Injectable } from "@nestjs/common";

@Injectable()
export class CalendarRepository {
    constructor(private readonly prisma) {}
}