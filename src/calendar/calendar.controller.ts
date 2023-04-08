import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Body,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { CalendarEntity } from './entities/calendar-entity';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

@ApiTags('Calendar')
@Controller('calendar')
export class CalendarController {
  constructor(private readonly service: CalendarService) {}

  @ApiOperation({
    summary: 'Adicionar uma data',
  })
  @Post()
  async create(@Body() dto: CreateCalendarDto): Promise<CalendarEntity> {
    try {
      return await this.service.create(dto);
    } catch (err) {}
  }

  @ApiOperation({
    summary: 'Buscar todas as datas',
  })
  @Get()
  async findAll(): Promise<CalendarEntity[]> {
    try {
      return await this.service.findAll();
    } catch (err) {}
  }

  @ApiOperation({
    summary: 'Buscar uma data por ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CalendarEntity> {
    try {
      return await this.service.findOne(id);
    } catch (err) {}
  }

  @ApiOperation({
    summary: 'Editar uma data por ID',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCalendarDto,
  ): Promise<CalendarEntity> {
    try {
      return await this.service.update(id, dto);
    } catch (err) {}
  }

  @ApiOperation({
    summary: 'Remover uma data por ID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.service.delete(id);
    } catch (err) {}
  }
}
