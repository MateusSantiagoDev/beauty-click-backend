import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ServicesEntity } from '../entities/services-entity';
import { Exceptions } from '../../utils/exceptions/exception';
import { ExceptionType } from '../../utils/exceptions/exceptions-protocols';
import { UserEntity } from '../../signup/entities/user-entity';

@Injectable()
export class ServicesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ServicesEntity): Promise<ServicesEntity> {
    try {
      return await this.prisma.services.create({ data });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException)
    }
  }

  async findAll(): Promise<ServicesEntity[]> {
    try {
      return await this.prisma.services.findMany();
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException)
    }
  }

  async findOne(id: string): Promise<ServicesEntity> {
    try {
      return await this.prisma.services.findFirstOrThrow({ where: { id } });
    } catch (err) {
      throw new Exceptions(ExceptionType.NotFundexception)
    }
  }

  async getUserById(userId: string): Promise<UserEntity> {
    try {
      return await this.prisma.user.findFirstOrThrow({ where: { id: userId } });
    } catch (err) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'Nenhum usuário encontrado!',
      );
    }
  }

  async update(
    id: string,
    data: Partial<ServicesEntity>,
  ): Promise<ServicesEntity> {
    try {
      return await this.prisma.services.update({ where: { id }, data });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.services.delete({ where: { id } });
    } catch (err) {
      throw new Exceptions(ExceptionType.UnprocessableEntityException)
    }
  }
}
