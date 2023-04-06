import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ServicesEntity } from '../entities/services-entity';

@Injectable()
export class ServicesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ServicesEntity): Promise<ServicesEntity> {
    try {
      return await this.prisma.services.create({ data });
    } catch (err) {}
  }

  async findAll(): Promise<ServicesEntity[]> {
    try {
      return await this.prisma.services.findMany();
    } catch (err) {}
  }

  async findOne(id: string): Promise<ServicesEntity> {
    try {
      return await this.prisma.services.findFirstOrThrow({ where: { id } });
    } catch (err) {}
  }

  async update(
    id: string,
    data: Partial<ServicesEntity>,
  ): Promise<ServicesEntity> {
    try {
      return await this.prisma.services.update({ where: { id }, data });
    } catch (err) {}
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.services.delete({ where: { id } });
    } catch (err) {}
  }
}
