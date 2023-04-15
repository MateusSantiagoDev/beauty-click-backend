import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from './repository/schedule-repository';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleEntity } from './entities/schedule-entity';
import { randomUUID } from 'crypto';
import { ValidationRequiredFields } from '../utils/helpers/required-fields';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';

@Injectable()
export class ScheduleService {
  constructor(private readonly repository: ScheduleRepository) {}

  async create(dto: CreateScheduleDto): Promise<ScheduleEntity> {
    const requiredFields = [
      'userId',
      'addressId',
      'serviceName',
      'calendarId',
      'day',
      'startTime',
    ];

    ValidationRequiredFields(dto, requiredFields);

    const user = await this.repository.getByUser(dto.userId);
    if (!user) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'usuário não encontrado',
      );
    }

    const address = await this.repository.getByAddress(dto.addressId);
    if (!address) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'Endereço não encontrado',
      );
    }

    for (const names of dto.serviceName) {
      const services = await this.repository.getByService([names]);
      if (!services) {
        throw new Exceptions(
          ExceptionType.NotFundexception,
          'Serviço não encontrado',
        );
      }
    }

    const calendar = await this.repository.getByCalendar(dto.calendarId);
    if (!calendar) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'Calendario não encontrado',
      );
    }

    for (const day of dto.day) {
      if (!calendar.day.includes(day)) {
        throw new Exceptions(
          ExceptionType.NotFundexception,
          'data indisponíveis',
        );
      }
    }

    for (const time of dto.startTime) {
      if (!calendar.startTime.includes(time)) {
        throw new Exceptions(
          ExceptionType.NotFundexception,
          'horarios indisponíveis',
        );
      }
    }

    const schedule: ScheduleEntity = {
      id: randomUUID(),
      ...dto,
    };
    return await this.repository.create(schedule);
  }

  async findAll(): Promise<ScheduleEntity[]> {
    return await this.repository.findAll();
  }
}
