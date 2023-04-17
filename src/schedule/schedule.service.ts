import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from './repository/schedule-repository';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleEntity } from './entities/schedule-entity';
import { randomUUID } from 'crypto';
import { ValidationRequiredFields } from '../utils/helpers/required-fields';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { SearchMethods } from '../utils/helpers/search-methods';

@Injectable()
export class ScheduleService {
  constructor(private readonly repository: ScheduleRepository) {}

  async create(dto: CreateScheduleDto): Promise<ScheduleEntity> {
    const requiredFields = [
      'userId',
      'addressId',
      'serviceName',
      'day',
      'startTime',
    ];

    ValidationRequiredFields(dto, requiredFields);

    const isUser = new SearchMethods(dto.userId, this.repository);
    await isUser.getByUser();

    const isScheduleCreated = new SearchMethods(dto.userId, this.repository);
    await isScheduleCreated.getBySchedule();

    const isAddress = new SearchMethods(dto.addressId, this.repository);
    await isAddress.getByAddress();

    const isServices = new SearchMethods(dto.addressId, this.repository);
    await isServices.getByServices(dto);

    const isCalendar = new SearchMethods(dto.addressId, this.repository);
    await isCalendar.getByCalendar(dto);

    const schedule: ScheduleEntity = {
      id: randomUUID(),
      ...dto,
    };
    return await this.repository.create(schedule);
  }

  async findAll(): Promise<ScheduleEntity[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<ScheduleEntity> {
    return await this.repository.findOne(id);
  }

  async update(id: string, dto: UpdateScheduleDto): Promise<ScheduleEntity> {
    await this.findOne(id);

    if (dto.serviceName) {
      const isServices = new SearchMethods(id, this.repository);
      await isServices.getByRelatedServices(dto);
    }

    if (dto.day || dto.startTime) {
      const isCalendar = new SearchMethods(id, this.repository);
      await isCalendar.getByRelatedAddress(dto);

      if (dto.day) {
        await isCalendar.getByRelatedAddress(dto.day);
      }

      if (dto.startTime) {
        await isCalendar.getByRelatedAddress(dto.startTime);
      }
    }

    const schedule: Partial<ScheduleEntity> = {
      ...dto,
    };

    return await this.repository.update(id, schedule);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }
}
