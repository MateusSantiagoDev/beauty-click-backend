import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddressLocationEntity } from '../entities/address-location-entity';
import { AddressEntity } from '../../address/entities/address-entity';

@Injectable()
export class AddressLocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(data: AddressLocationEntity): Promise<AddressLocationEntity> {
    try {
      return await this.prisma.addressLocation.create({ data });
    } catch (err) {}
  }

  async findByNeighborhood(neighborhood: string): Promise<AddressEntity[]> {
    try {
      return await this.prisma.address.findMany({
        where: {
          neighborhood: {
            contains: neighborhood,
          },
        },
      });
    } catch (err) {
      null;
    }
  }

  async getSavedAddresses(): Promise<any> {
    try {
      return await this.prisma.address.findMany();
    } catch (err) {}
  }

  async getLocationByAddress(neighborhood): Promise<any> {
    try {
      return await this.prisma.location.findMany({
        where: { neighborhood: { equals:neighborhood }}
      });
    } catch (err) {}
  }
}
