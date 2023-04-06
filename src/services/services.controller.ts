import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateServicesDto } from './dto/create-services.dto';
import { ServicesEntity } from './entities/services-entity';
import { UpdateServicesDto } from './dto/update-services.dto';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  @ApiOperation({
    summary: 'Adicionar um serviço',
  })
  @Post()
  async create(@Body() dto: CreateServicesDto): Promise<ServicesEntity> {
    try {
      return await this.service.create(dto);
    } catch (err) {}
  }

  @ApiOperation({
    summary: 'Buscar todos os serviços',
  })
  @Get()
  async findAll(): Promise<ServicesEntity[]> {
    try {
      return await this.service.findAll();
    } catch (err) {}
  }

  @ApiOperation({
    summary: 'Buscar um serviço por ID',
  })
  @Get(':id')
  async findOne(@Param() id: string): Promise<ServicesEntity> {
    try {
      return await this.service.findOne(id);
    } catch (err) {}
  }

  @ApiOperation({
    summary: 'Editar um serviço por ID',
  })
  @Patch(':id')
  async update(
    @Param() id: string,
    @Body() dto: UpdateServicesDto,
  ): Promise<ServicesEntity> {
    try {
      return await this.service.update(id, dto);
    } catch (err) {}
  }

  @ApiOperation({
    summary: 'Remover um serviços por ID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param() id: string): Promise<void> {
    try {
      await this.service.delete(id);
    } catch (err) {}
  }
}
