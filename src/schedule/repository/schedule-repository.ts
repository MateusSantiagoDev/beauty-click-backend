import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ScheduleEntity } from '../entities/schedule-entity';
import { Exceptions } from '../../utils/exceptions/exception';
import { ExceptionType } from '../../utils/exceptions/exceptions-protocols';
import { UserEntity } from '../../signup/entities/user-entity';
import { AddressEntity } from '../../address/entities/address-entity';
import { ServicesEntity } from '../../services/entities/services-entity';

@Injectable()
export class ScheduleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ScheduleEntity): Promise<ScheduleEntity> {
    try {
      return await this.prisma.schedule.create({ data });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findAll(): Promise<ScheduleEntity[]> {
    try {
      return await this.prisma.schedule.findMany({
        include: {
          address: true,
          services: true,
        },
      });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async getByUser(userId: string): Promise<UserEntity> {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: { id: userId },
      });
    } catch (err) {
      null;
    }
  }

  async getByAddress(addressId: string): Promise<AddressEntity> {
    try {
      return await this.prisma.address.findFirstOrThrow({
        where: { id: addressId },
      });
    } catch (err) {
      null;
    }
  }

  async getByService(serviceName: string[]): Promise<ServicesEntity> {
    try {
      return await this.prisma.services.findFirstOrThrow({
        where: {
          serviceName: {
            in: serviceName,
          },
        },
      });
    } catch (err) {
      null;
    }
  }

  async getByCalendar(addressId: string): Promise<any> {
    try {
      return await this.prisma.calendar.findUnique({
        where: {
          addressId: addressId,
        },
        select: {
          day: true,
          startTime: true,
        },
      });
    } catch (err) {
      null;
    }
  }

  async getByRelatedAddress(id: string): Promise<any> {
    try {
      const address = await this.prisma.schedule.findUnique({
        where: { id },
        select: {
          addressId: true,
        },
      });
      return await this.prisma.calendar.findUnique({
        where: {
          addressId: address.addressId,
        },
        select: {
          day: true,
          startTime: true,
        },
      });
    } catch (err) {
      null;
    }
  }

  async getBySchedule(userId: string): Promise<any> {
    try {
      return await this.prisma.schedule.findFirstOrThrow({
        where: { userId: userId },
      });
    } catch (err) {
      null;
    }
  }

  async findOne(id: string): Promise<ScheduleEntity> {
    try {
      return await this.prisma.schedule.findUniqueOrThrow({ where: { id } });
    } catch (err) {
      throw new Exceptions(ExceptionType.NotFundexception);
    }
  }

  async update(
    id: string,
    data: Partial<ScheduleEntity>,
  ): Promise<ScheduleEntity> {
    try {
      return await this.prisma.schedule.update({ where: { id }, data });
    } catch (err) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.schedule.delete({ where: { id } });
    } catch (err) {
      throw new Exceptions(ExceptionType.UnprocessableEntityException);
    }
  }
}
