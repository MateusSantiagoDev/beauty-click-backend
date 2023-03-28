import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from '../entities/user-entity';
import { Exceptions } from '../../utils/exceptions/exception';
import { ExceptionType } from '../../utils/exceptions/exceptions-protocols';

@Injectable()
export class SignupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserEntity): Promise<UserEntity> {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      return await this.prisma.user.findFirstOrThrow({ where: { id } });
    } catch (error) {
      throw new Exceptions(ExceptionType.NotFundexception);
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.prisma.user.findFirstOrThrow({ where: { email } });
    } catch (error) {
      return null;
    }
  }

  async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    try {
      return await this.prisma.user.update({ where: { id }, data });
    } catch (error) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new Exceptions(ExceptionType.UnprocessableEntityException);
    }
  }
}
