import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/signup/entities/user-entity';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';
import { PrismaService } from '../../prisma/prisma.service';
import { AddressEntity } from '../entities/address-entity';

@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: AddressEntity): Promise<AddressEntity> {
    try {
      return await this.prisma.address.create({ data });
    } catch (error) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findAll(): Promise<AddressEntity[]> {
    try {
      return await this.prisma.address.findMany();
    } catch (error) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findOne(id: string): Promise<AddressEntity> {
    try {
      return await this.prisma.address.findFirstOrThrow({ where: { id } });
    } catch (error) {
      throw new Exceptions(ExceptionType.NotFundexception);
    }
  }

  async getUserById(userId: string): Promise<UserEntity> {
    try {
      return await this.prisma.user.findFirstOrThrow({ where: { id: userId } });
    } catch (error) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'Nenhum usuário encontrado!',
      );
    }
  }

  async findByName(name: string): Promise<AddressEntity> {
    try {
      return await this.prisma.address.findUniqueOrThrow({ where: { name } });
    } catch (error) {
      return null
    }
  }

  async update(
    id: string,
    data: Partial<AddressEntity>,
  ): Promise<AddressEntity> {
    try {
      return await this.prisma.address.update({ where: { id }, data });
    } catch (error) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.address.delete({ where: { id } });
    } catch (error) {
      throw new Exceptions(ExceptionType.UnprocessableEntityException);
    }
  }
}
