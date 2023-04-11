import { Injectable } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LoginRepository {
    constructor(private readonly prisma: PrismaService) {}
}