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
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.prisma.user.findMany({
        include: {
          addresses: true,
        },
      });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: { id },
        include: {
          addresses: true,
        },
      });
    } catch (err) {
      throw new Exceptions(ExceptionType.NotFundexception);
    }
  }

  async getByPhone(phone: string): Promise<UserEntity> {
    try {
      return await this.prisma.user.findFirst({
        where: { phone },
      });
    } catch (err) {
      null;
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.prisma.user.findFirstOrThrow({ where: { email } });
    } catch (err) {
      return null;
    }
  }

  async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    try {
      return await this.prisma.user.update({ where: { id }, data });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.address.deleteMany({ where: { userId: id } });
        await prisma.user.delete({ where: { id } });
      });
    } catch (err) {
      throw new Exceptions(ExceptionType.UnprocessableEntityException);
    }
  }
}
