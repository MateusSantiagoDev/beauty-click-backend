import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddressEntity } from './entities/location-entity';
import { LocationService } from './location.service';
import { AddressDto } from './dto/create-location.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private service: LocationService) {}

  @ApiOperation({
    summary: 'Adicionar um endereço'
  })
  @Post()
  async create(@Body() body: AddressDto ): Promise<AddressEntity> {
    const address = body.address
    const addressInfo = await this.service.create(address);

    return addressInfo;
  }

  @ApiOperation({
    summary: 'Buscar todos os endereços'
  })
  @Get()
  async findAll(): Promise<AddressEntity[]> {
    return await this.service.findAll()
  }

}