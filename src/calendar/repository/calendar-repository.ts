import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CalendarEntity } from '../entities/calendar-entity';
import { ExceptionType } from '../../utils/exceptions/exceptions-protocols';
import { Exceptions } from '../../utils/exceptions/exception';
import { AddressEntity } from '../../address/entities/address-entity';
import { Validation } from '../../utils/exceptions/error/validation';

@Injectable()
export class CalendarRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CalendarEntity): Promise<CalendarEntity> {
    try {
      const address = await this.prisma.calendar.findUnique({
        where: { addressId: data.addressId },
      });

      if (address) {
        throw new Validation(
          'Já existe um Calendario de agendamentos para a loja em questão',
        );
      }
      return await this.prisma.calendar.create({
        data: {
          ...data,
          day: { set: data.day },
          startTime: { set: data.startTime },
        },
      });
    } catch (err) {
      if (err instanceof Validation) {
        throw new Exceptions(ExceptionType.UnauthorizedException, err.message);
      }
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findAll(): Promise<CalendarEntity[]> {
    try {
      return await this.prisma.calendar.findMany({
        include: {
          address: true,
        },
      });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findOne(id: string): Promise<CalendarEntity> {
    try {
      return await this.prisma.calendar.findFirstOrThrow({
        where: { id },
        include: {
          address: true,
        },
      });
    } catch (err) {
      throw new Exceptions(ExceptionType.NotFundexception);
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
    data: Partial<CalendarEntity>,
  ): Promise<CalendarEntity> {
    try {
      return await this.prisma.calendar.update({
        where: { id },
        data,
      });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.calendar.delete({ where: { id } });
    } catch (err) {
      throw new Exceptions(ExceptionType.UnprocessableEntityException);
    }
  }
}
