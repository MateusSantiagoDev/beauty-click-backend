import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationRepository } from './repository/location-repository';

@Module({
  imports: [PrismaModule],
  controllers: [LocationController],
  providers: [LocationService, LocationRepository],
})
export class LocationModule {}
