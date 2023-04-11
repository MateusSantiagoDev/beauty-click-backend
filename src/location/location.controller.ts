import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { LocationEntity } from './entities/location-entity';
import { LocationService } from './location.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HandleExceptions } from '../utils/exceptions/handle-exceptions';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Location')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('location')
export class LocationController {
  constructor(private service: LocationService) {}

  @ApiOperation({
    summary: 'Buscar todas as localizações',
  })
  @Get()
  async findAll(): Promise<LocationEntity[]> {
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
  async findOne(@Param('id') id: string): Promise<LocationEntity> {
    try {
      return await this.service.findOne(id);
    } catch (err) {
      HandleExceptions(err);
    }
  }
}
