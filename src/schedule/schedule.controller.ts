import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleEntity } from './entities/schedule-entity';
import { HandleExceptions } from '../utils/exceptions/handle-exceptions';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @ApiOperation({
    summary: 'Adicionar um atendimento',
  })
  @Post()
  async create(@Body() dto: CreateScheduleDto): Promise<ScheduleEntity> {
    try {
      return await this.service.create(dto);
    } catch (err) {
      HandleExceptions(err)
    }
  }

  @ApiOperation({
    summary: 'Buscar todos os atendimentos',
  })
  @Get()
  async findAll(): Promise<ScheduleEntity[]> {
    try {
      return await this.service.findAll();
    } catch (err) {}
  }
}
