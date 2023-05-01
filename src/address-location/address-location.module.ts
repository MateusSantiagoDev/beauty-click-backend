import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AddressLocationController } from './address-location.controller';
import { AddressLocartionService } from './address-location.service';
import { AddressLocationRepository } from './repository/address-location-repository';

@Module({
  imports: [PrismaModule],
  controllers: [AddressLocationController],
  providers: [AddressLocartionService, AddressLocationRepository],
  exports: [AddressLocationRepository],
})
export class AddressLocationModule {}
