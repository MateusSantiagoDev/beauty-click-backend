import { Body, Controller, Delete, Get, Param, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AddressEntity } from './entities/location-entity';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HandleExceptions } from '../utils/exceptions/handle-exceptions';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private service: LocationService) {}

  @ApiOperation({
    summary: 'Adicionar uma localização',
  })
  @Post()
  async create(@Body() body: CreateLocationDto): Promise<AddressEntity> {
    try {
      const address = body.address;
      return await this.service.create(address);
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar todas as localizações',
  })
  @Get()
  async findAll(): Promise<AddressEntity[]> {
    try {
      return await this.service.findAll();
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar uma localização pelo ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AddressEntity> {
    try {
      return await this.service.findOne(id);
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Remover uma localização por ID',
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
