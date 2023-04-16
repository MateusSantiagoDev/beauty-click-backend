import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from './repository/schedule-repository';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleEntity } from './entities/schedule-entity';
import { randomUUID } from 'crypto';
import { ValidationRequiredFields } from '../utils/helpers/required-fields';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

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

    const user = await this.repository.getByUser(dto.userId);
    if (!user) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'usuário não encontrado',
      );
    }

    const scheduleCreated = await this.repository.getBySchedule(dto.userId)
    if(scheduleCreated) {
      throw new Exceptions(
        ExceptionType.NotFundexception,
        'o agendamento já foi realizado',
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

    const calendar = await this.repository.getByCalendar(dto.addressId);
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

  async findOne(id: string): Promise<ScheduleEntity> {
    return await this.repository.findOne(id);
  }

  async update(id: string, dto: UpdateScheduleDto): Promise<ScheduleEntity> {
    await this.findOne(id);

    if (dto.serviceName) {
      for (const names of dto.serviceName) {
        const services = await this.repository.getByService([names]);
        if (!services) {
          throw new Exceptions(
            ExceptionType.NotFundexception,
            'Serviço não encontrado',
          );
        }
      }
    }

    if (dto.day || dto.startTime) {
      const calendar = await this.repository.getByRelatedAddress(id);
      if (!calendar) {
        throw new Exceptions(
          ExceptionType.NotFundexception,
          'Calendario não encontrado',
        );
      }

      if (dto.day) {
       dto.day.map((day) => {
          if (!calendar.day.includes(day)) {
            throw new Exceptions(
              ExceptionType.NotFundexception,
              'data indisponível',
            );
          }
          return Array.isArray(day) ? day : [day];
      
        });
      }

      if (dto.startTime) {
        dto.startTime.map((time) => {
          if (!calendar.startTime.includes(time)) {
            throw new Exceptions(
              ExceptionType.NotFundexception,
              'horario indisponível',
            );
          }
          return Array.isArray(time) ? time : [time];
        });
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
