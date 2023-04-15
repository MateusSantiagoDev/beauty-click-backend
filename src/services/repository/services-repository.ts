import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ServicesEntity } from '../entities/services-entity';
import { Exceptions } from '../../utils/exceptions/exception';
import { ExceptionType } from '../../utils/exceptions/exceptions-protocols';
import { AddressEntity } from '../../address/entities/address-entity';

@Injectable()
export class ServicesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ServicesEntity): Promise<ServicesEntity> {
    try {
      return await this.prisma.services.create({ data });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findAll(): Promise<ServicesEntity[]> {
    try {
      return await this.prisma.services.findMany({
        include: {
          address: true,
        },
      });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findOne(id: string): Promise<ServicesEntity> {
    try {
      return await this.prisma.services.findFirstOrThrow({
        where: { id },
        include: { address: true },
      });
    } catch (err) {
      throw new Exceptions(ExceptionType.NotFundexception);
    }
  }

  // verificando se o serviço ja esta adicionado ao endereço especifico
  async getByService(
    serviceName: string,
    addressId: string,
  ): Promise<ServicesEntity> {
    try {
      return await this.prisma.services.findFirst({
        where: { serviceName, addressId },
      });
    } catch (err) {
      null;
    }
  }

  async getAddressById(addressId: string): Promise<AddressEntity> {
    try {
      return await this.prisma.address.findFirstOrThrow({
        where: { id: addressId },
      });
    } catch (err) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'Nenhum Endereço encontrado!',
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
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.services.delete({ where: { id } });
    } catch (err) {
      throw new Exceptions(ExceptionType.UnprocessableEntityException);
    }
  }
}
