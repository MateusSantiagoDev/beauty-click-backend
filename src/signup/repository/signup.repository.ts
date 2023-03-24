import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

Injectable()
export class SignupRepository {
    delete(id: string): import("../entities/user-entity").UserEntity | PromiseLike<import("../entities/user-entity").UserEntity> {
        throw new Error("Method not implemented.");
    }
    update(id: string, dto: UpdateUserDto): import("../entities/user-entity").UserEntity | PromiseLike<import("../entities/user-entity").UserEntity> {
        throw new Error("Method not implemented.");
    }
    findOne(id: string): import("../entities/user-entity").UserEntity | PromiseLike<import("../entities/user-entity").UserEntity> {
        throw new Error("Method not implemented.");
    }
    finaAll(): import("../entities/user-entity").UserEntity[] | PromiseLike<import("../entities/user-entity").UserEntity[]> {
        throw new Error("Method not implemented.");
    }
    create(dto: CreateUserDto): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    constructor (private readonly prisma: PrismaService) {}
}