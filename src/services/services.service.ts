import { Injectable } from '@nestjs/common';
import { ServicesRepository } from './repository/services-repository';
import { UpdateServicesDto } from './dto/update-services.dto';
import { CreateServicesDto } from './dto/create-services.dto';
import { ServicesEntity } from './entities/services-entity';
import { randomUUID } from 'crypto';

@Injectable()
export class ServicesService {
  constructor(private readonly repository: ServicesRepository) {}

  async create(dto: CreateServicesDto): Promise<ServicesEntity> {
    const servicesModel: ServicesEntity = {
      id: randomUUID(),
      ...dto,
    };
    return await this.repository.create(servicesModel);
  }

  async findAll(): Promise<ServicesEntity[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<ServicesEntity> {
    return await this.repository.findOne(id);
  }

  async update(id: string, dto: UpdateServicesDto): Promise<ServicesEntity> {
    await this.findOne(id);
    const servicesModel: Partial<ServicesEntity> = { ...dto };
    return await this.repository.update(id, servicesModel);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }
  
}
