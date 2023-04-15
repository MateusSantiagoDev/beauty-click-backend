import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ScheduleEntity } from '../entities/schedule-entity';
import { Exceptions } from '../../utils/exceptions/exception';
import { ExceptionType } from '../../utils/exceptions/exceptions-protocols';
import { Validation } from '../../utils/exceptions/error/validation';
import { UserEntity } from '../../signup/entities/user-entity';
import { AddressEntity } from '../../address/entities/address-entity';
import { ServicesEntity } from '../../services/entities/services-entity';
import { CalendarEntity } from '../../calendar/entities/calendar-entity';

@Injectable()
export class ScheduleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ScheduleEntity): Promise<ScheduleEntity> {
    try {
      return await this.prisma.schedule.create({ data })
    } catch (err) {
      if (err instanceof Validation) {
        throw new Exceptions(ExceptionType.InvalidData, err.message);
      }
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findAll(): Promise<ScheduleEntity[]> {
    try {
      return await this.prisma.schedule.findMany({
        include: {
          address: true,
          calendar: true,
          services: true,
        },
      });
    } catch (err) {}
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

  async getByCalendar(calendarId: string): Promise<CalendarEntity> {
    try {
      return await this.prisma.calendar.findFirstOrThrow({
        where: { id: calendarId },
      });
    } catch (err) {
      null;
    }
  }
}
