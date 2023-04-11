import { Injectable } from "@nestjs/common";

@Injectable()
export class LoginRepository {
    constructor(private readonly prisma) {}
}