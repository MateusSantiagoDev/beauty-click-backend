import { Injectable } from "@nestjs/common";

@Injectable()
export class ServicesRepository {
    constructor(private readonly prisma) {}
}