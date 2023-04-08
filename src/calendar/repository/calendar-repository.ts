import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CalendarRepository {
    constructor(private readonly prisma: PrismaService) {}
}