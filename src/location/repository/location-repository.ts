import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressEntity } from '../entities/location-entity';

@Injectable()
export class LocationRepository {
 
  constructor(private readonly prisma: PrismaService) {}

  async create(address: AddressEntity): Promise<AddressEntity> {
    return await this.prisma.location.create({ data: address });
  }

  async findAll(): Promise<AddressEntity[]> {
    return await this.prisma.location.findMany()
  }

  async findOne(id: string): Promise<AddressEntity> {
    return await this.prisma.location.findUniqueOrThrow({ where: { id }})
  }

  

  async delete(id: string): Promise<void> {
    await this.prisma.location.delete({ where: { id }})
  } 
}
