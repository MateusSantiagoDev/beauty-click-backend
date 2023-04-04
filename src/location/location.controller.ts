import { Body, Controller, Post } from '@nestjs/common';
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
  async getAddressInfo(@Body() body: AddressDto ): Promise<AddressEntity> {
    const address = body.address
    const addressInfo = await this.service.getAddressInfo(address);

    return addressInfo;
  }
}