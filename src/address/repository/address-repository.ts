import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/signup/entities/user-entity';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';
import { PrismaService } from '../../prisma/prisma.service';
import { AddressEntity } from '../entities/address-entity';
import { LocationService } from '../../location/location.service';

@Injectable()
export class AddressRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly locationService: LocationService,
  ) {}

  async create(data: AddressEntity): Promise<AddressEntity> {
    try {
      const response = await this.prisma.address.create({
        data: {
          ...data,
          contacts: { set: data.contacts },
        },
      });

      await this.locationService.create(
        ` ${data.id}, ${data.number}, ${data.street}, ${data.neighborhood}, ${data.city}, ${data.state}, ${data.postalCode}`,
      );

      return response;
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findAll(): Promise<AddressEntity[]> {
    try {
      return await this.prisma.address.findMany({
        include: {
          location: true,
          calendar: true,
          Services: true,
        },
      });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findOne(id: string): Promise<AddressEntity> {
    try {
      return await this.prisma.address.findFirstOrThrow({
        where: { id },
        include: {
          location: true,
          calendar: true,
          Services: true,
        },
      });
    } catch (err) {
      throw new Exceptions(ExceptionType.NotFundexception);
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

  async findByName(name: string): Promise<AddressEntity> {
    try {
      return await this.prisma.address.findFirst({
        where: { name, userId: { not: null } },
      });
    } catch (err) {
      return null;
    }
  }

  async update(
    id: string,
    data: Partial<AddressEntity>,
  ): Promise<AddressEntity> {
    try {
      return await this.prisma.address.update({
        where: { id },
        data: {
          ...data,
          contacts: { set: data.contacts },
        },
      });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.services.deleteMany({ where: { addressId: id } });
        await prisma.location.delete({ where: { addressDataId: id } });
        await prisma.calendar.delete({ where: { addressId: id } });
        await prisma.address.delete({ where: { id } });
      });
    } catch (err) {
      throw new Exceptions(ExceptionType.UnprocessableEntityException);
    }
  }
}
