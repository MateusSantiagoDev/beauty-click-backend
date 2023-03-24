import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user-entity';
import { SignupRepository } from './repository/signup.repository';

@Injectable()
export class SignupService {
  constructor(private readonly repository: SignupRepository) {}
  async create(dto: CreateUserDto): Promise<UserEntity> {
    return await this.repository.create(dto);
  }
  async findAll(): Promise<UserEntity[]> {
    return await this.repository.finaAll();
  }
  async findOne(id: string): Promise<UserEntity> {
    return await this.repository.findOne(id);
  }
  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    return await this.repository.update(id, dto);
  }
  async delete(id: string): Promise<UserEntity> {
    return await this.repository.delete(id);
  }
}
