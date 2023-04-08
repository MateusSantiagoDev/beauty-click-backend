import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CalendarEntity } from '../entities/calendar-entity';

@Injectable()
export class CalendarRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CalendarEntity): Promise<CalendarEntity> {
    try {
      return await this.prisma.calendar.create({ data });
    } catch (err) {}
  }

  async findAll(): Promise<CalendarEntity[]> {
    try {
      return await this.prisma.calendar.findMany();
    } catch (err) {}
  }

  async findOne(id: string): Promise<CalendarEntity> {
    try {
      return await this.prisma.calendar.findFirstOrThrow({ where: { id } });
    } catch (err) {}
  }

  async update(
    id: string,
    data: Partial<CalendarEntity>,
  ): Promise<CalendarEntity> {
    try {
      return await this.prisma.calendar.update({ where: { id }, data });
    } catch (err) {}
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.calendar.delete({ where: { id } });
    } catch (err) {}
  }
}
