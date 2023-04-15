import { Injectable } from '@nestjs/common';
import { ServicesRepository } from './repository/services-repository';
import { UpdateServicesDto } from './dto/update-services.dto';
import { CreateServicesDto } from './dto/create-services.dto';
import { ServicesEntity } from './entities/services-entity';
import { randomUUID } from 'crypto';
import { ValidationRequiredFields } from '../utils/helpers/required-fields';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';

@Injectable()
export class ServicesService {
  constructor(private readonly repository: ServicesRepository) {}
  async create(dto: CreateServicesDto): Promise<ServicesEntity> {
    const requiredFields = ['addressId', 'serviceName', 'images', 'price'];
    ValidationRequiredFields(dto, requiredFields);

    await this.repository.getAddressById(dto.addressId);

    const isService = await this.repository.getByService(
      dto.serviceName,
      dto.addressId,
    );

    if (isService) {
      throw new Exceptions(
        ExceptionType.InvalidData,
        'Esse serviço já esta cadastrado nesse endereço!',
      );
    }

    const service: ServicesEntity = {
      id: randomUUID(),
      ...dto,
      images: Array.isArray(dto.images) ? dto.images : [dto.images],
    };

    return await this.repository.create(service);
  }

  async findAll(): Promise<ServicesEntity[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<ServicesEntity> {
    return await this.repository.findOne(id);
  }

  async update(id: string, dto: UpdateServicesDto): Promise<ServicesEntity> {
    await this.findOne(id);

    const service: Partial<ServicesEntity> = {
      id: randomUUID(),
      ...dto,
      images: Array.isArray(dto.images) ? dto.images : [dto.images],
    };

    return await this.repository.update(id, service);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }
}
