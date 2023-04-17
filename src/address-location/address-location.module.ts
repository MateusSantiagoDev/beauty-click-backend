import { Module } from '@nestjs/common';
import { AddressLocationController } from './address-location.controller';
import { AddressLocartionService } from './address-location.service';
import { AddressLocationRepository } from './repository/address-location-repository';

@Module({
  imports: [],
  controllers: [AddressLocationController],
  providers: [AddressLocartionService, AddressLocationRepository],
})
export class AddressLocationModule {}
