import { Controller, Get, Param, Query } from '@nestjs/common';
import { AddressLocartionService } from './address-location.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateAddressLocationDto } from './dto/create-address-location.dto';
import { AddressLocationEntity } from './entities/address-location-entity';

@ApiTags('Places')
@Controller('places')
export class AddressLocationController {
  constructor(private readonly service: AddressLocartionService) {}

  @ApiOperation({
    summary: 'Buscar endereços próximos',
  })
  @Get(':neighborhood')
  async create(
    @Query('neighborhood') neighborhood: CreateAddressLocationDto,
  ): Promise<AddressLocationEntity> {
    try {
      return await this.service.create(neighborhood);
    } catch (err) {}
  } 
}
