import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleEntity } from './entities/schedule-entity';
import { HandleExceptions } from '../utils/exceptions/handle-exceptions';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

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
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar todos os atendimentos',
  })
  @Get()
  async findAll(): Promise<ScheduleEntity[]> {
    try {
      return await this.service.findAll();
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar um atendimento por ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ScheduleEntity> {
    try {
      return await this.service.findOne(id);
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Editar um atendimento por ID',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateScheduleDto,
  ): Promise<ScheduleEntity> {
    try {
      return await this.service.update(id, dto);
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Remoder um atendimentos por ID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.service.delete(id);
    } catch (err) {
      HandleExceptions(err);
    }
  }
}
