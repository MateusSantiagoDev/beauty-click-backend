import { Injectable } from '@nestjs/common';
import { CalendarRepository } from './repository/calendar-repository';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { CalendarEntity } from './entities/calendar-entity';
import { randomUUID } from 'crypto';
import { ValidationRequiredFields } from '../utils/helpers/required-fields';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';

@Injectable()
export class CalendarService {
  constructor(private readonly repository: CalendarRepository) {}

  async create(dto: CreateCalendarDto): Promise<CalendarEntity> {
    const requiredFields = ['day', 'startTime'];
    ValidationRequiredFields(dto, requiredFields);

    await this.repository.getAddressById(dto.addressId);

    const fields = [
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sabado',
      'domingo',
    ];

    // verificando se existe day, se ele faz parte do objeto fields e se ele é único
    if (
      dto.day.length === 0 ||
      !dto.day.every((day) => fields.includes(day)) ||
      dto.day.length !== new Set(dto.day).size
    ) {
      throw new Exceptions(ExceptionType.InvalidData, 'O campo dia é inválido, verifique se foi preenchido corretamente!');
    }

    // verifica existe hora, se a hora tem o formato correto e se é única
    const timeRegex = /^(0\d|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (
      dto.startTime.length === 0 ||
      !dto.startTime.every((time) => timeRegex.test(time)) ||
      dto.startTime.length !== new Set(dto.startTime).size
    ) {
      throw new Exceptions(ExceptionType.InvalidData, 'O campo hora é inválido, verifique se foi preenchido corretamente!');
    }

    const calendar: CalendarEntity = {
      id: randomUUID(),
      day: Array.isArray(dto.day) ? dto.day : [dto.day],
      startTime: Array.isArray(dto.startTime) ? dto.startTime : [dto.startTime],
      addressId: dto.addressId,
    };
    return await this.repository.create(calendar);
  }

  async findAll(): Promise<CalendarEntity[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<CalendarEntity> {
    return await this.repository.findOne(id);
  }

  async update(id: string, dto: UpdateCalendarDto): Promise<CalendarEntity> {
    await this.findOne(id);

    if (dto.day) {
      const fields = [
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sabado',
        'domingo',
      ];

      // verificando se existe day, se ele faz parte do objeto fields e se ele é único
      if (
        dto.day.length === 0 ||
        !dto.day.every((day) => fields.includes(day)) ||
        dto.day.length !== new Set(dto.day).size
      ) {
        throw new Exceptions(ExceptionType.InvalidData, 'O campo dia é inválido, verifique se foi preenchido corretamente!');
      }
      dto.day = Array.isArray(dto.day) ? dto.day : [dto.day]
    }
    if (dto.startTime) {
      // verifica existe hora, se a hora tem o formato correto e se é única
      const timeRegex = /^(0\d|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
      if (
        dto.startTime.length === 0 ||
        !dto.startTime.every((time) => timeRegex.test(time)) ||
        dto.startTime.length !== new Set(dto.startTime).size
      ) {
        throw new Exceptions(ExceptionType.InvalidData, 'O campo hora é inválido, verifique se foi preenchido corretamente!');
      }
      dto.startTime = Array.isArray(dto.startTime) ? dto.startTime : [dto.startTime]
    }
    const calendar: Partial<CalendarEntity> = {
      ...dto
    };
    return await this.repository.update(id, calendar);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }
}
