import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressEntity } from '../entities/location-entity';

@Injectable()
export class LocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAddressInfo(address: AddressEntity): Promise<AddressEntity> {
    return await this.prisma.location.create({ data: address });
  }
}
