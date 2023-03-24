import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { SignupRepository } from "./repository/signup.repository";

@Injectable()
export class SignupService {
    delete(id: string): import("./entities/user-entity").UserEntity | PromiseLike<import("./entities/user-entity").UserEntity> {
        throw new Error('Method not implemented.');
    }
    update(id: string, dto: UpdateUserDto): import("./entities/user-entity").UserEntity | PromiseLike<import("./entities/user-entity").UserEntity> {
        throw new Error('Method not implemented.');
    }
    findOne(id: string): import("./entities/user-entity").UserEntity | PromiseLike<import("./entities/user-entity").UserEntity> {
        throw new Error('Method not implemented.');
    }
    findAll(): import("./entities/user-entity").UserEntity[] | PromiseLike<import("./entities/user-entity").UserEntity[]> {
        throw new Error('Method not implemented.');
    }
    create(dto: CreateUserDto): import("./entities/user-entity").UserEntity | PromiseLike<import("./entities/user-entity").UserEntity> {
        throw new Error('Method not implemented.');
    }
    constructor (private readonly repository: SignupRepository) {}
}