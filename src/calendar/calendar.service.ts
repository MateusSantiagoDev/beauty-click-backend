import { Injectable } from '@nestjs/common';
import { CalendarRepository } from './repository/calendar-repository';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { CalendarEntity } from './entities/calendar-entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CalendarService {
  constructor(private readonly repository: CalendarRepository) {}

  async create(dto: CreateCalendarDto): Promise<CalendarEntity> {
    const calendar: CalendarEntity = {
      id: randomUUID(),
      ...dto,
    };
    return await this.repository.create(calendar);
  }

  async findAll(): Promise<CalendarEntity[]> {
    return await this.repository.findAll()
  }

  async findOne(id: string): Promise<CalendarEntity> {
    return await this.repository.findOne(id)
  }

  async update(id: string, dto: UpdateCalendarDto): Promise<CalendarEntity> {
    await this.findOne(id)

    const calendar: Partial<CalendarEntity> = {
      ...dto,
    }
    return await this.repository.update(id, calendar)
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id)
    await this.repository.delete(id)
  }
}
