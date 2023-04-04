import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddressEntity } from './entities/location-entity';
import { LocationService } from './location.service';
import { AddressDto } from './dto/create-location.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private service: LocationService) {}

  @ApiOperation({
    summary: 'Adicionar uma localização'
  })
  @Post()
  async create(@Body() body: AddressDto ): Promise<AddressEntity> {
    const address = body.address
    const addressInfo = await this.service.create(address);

    return addressInfo;
  }

  @ApiOperation({
    summary: 'Buscar todas as localizações'
  })
  @Get()
  async findAll(): Promise<AddressEntity[]> {
    return await this.service.findAll()
  }

  @ApiOperation({
    summary: 'Buscar uma localização pelo ID'
  })
  @Get(':id')
  async findOne(@Param('id') id: string ): Promise<AddressEntity> {
    return await this.service.findOne(id)
  }

  @ApiOperation({
    summary: 'Remover uma localização por ID'
  })
  @Delete(':id')
  async delete(@Param('id') id: string ): Promise<void> {
    await this.service.delete(id)
  }

}