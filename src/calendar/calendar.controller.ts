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
  UseGuards,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { CalendarEntity } from './entities/calendar-entity';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { HandleExceptions } from '../utils/exceptions/handle-exceptions';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Calendar')
@UseGuards(AuthGuard())
@ApiBearerAuth()
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
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar todas as datas',
  })
  @Get()
  async findAll(): Promise<CalendarEntity[]> {
    try {
      return await this.service.findAll();
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar uma data por ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CalendarEntity> {
    try {
      return await this.service.findOne(id);
    } catch (err) {
      HandleExceptions(err);
    }
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
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Remover uma data por ID',
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
