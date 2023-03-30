import { Injectable } from "@nestjs/common";

@Injectable()
export class LocationRepository {
    constructor (private readonly prisma) {}
}