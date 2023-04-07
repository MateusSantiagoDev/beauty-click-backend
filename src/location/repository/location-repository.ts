import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressEntity } from '../entities/location-entity';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';

@Injectable()
export class LocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(address: AddressEntity): Promise<AddressEntity> {
    try {
      return await this.prisma.location.create({ data: address });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findAll(): Promise<AddressEntity[]> {
    try {
      return await this.prisma.location.findMany();
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findOne(id: string): Promise<AddressEntity> {
    try {
      return await this.prisma.location.findUniqueOrThrow({ where: { id } });
    } catch (err) {
      throw new Exceptions(ExceptionType.NotFundexception);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.location.delete({ where: { id } });
    } catch (err) {
      throw new Exceptions(ExceptionType.UnprocessableEntityException);
    }
  }
}
