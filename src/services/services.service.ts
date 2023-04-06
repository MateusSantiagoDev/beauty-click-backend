import { Injectable } from '@nestjs/common';
import { ServicesRepository } from './repository/services-repository';
import { UpdateServicesDto } from './dto/update-services.dto';
import { CreateServicesDto } from './dto/create-services.dto';
import { ServicesEntity } from './entities/services-entity';
import { randomUUID } from 'crypto';
import { ValidationRequiredFields } from '../utils/helpers/required-fields';
import { ValidationMethods } from '../utils/helpers/validation-methods';
import { Exceptions } from '../utils/exceptions/exception';
import { ExceptionType } from '../utils/exceptions/exceptions-protocols';

@Injectable()
export class ServicesService {
  constructor(private readonly repository: ServicesRepository) {}

  async create(dto: CreateServicesDto): Promise<ServicesEntity> {
    const requiredFields = ['name', 'image'];

    ValidationRequiredFields(dto, requiredFields);

    await this.repository.getUserById(dto.userId);

    const servicesModel: ServicesEntity = {
      id: randomUUID(),
      ...dto,
    };

    const services = new ValidationMethods(this.repository, dto);
    const user = services.checkAuthorization(servicesModel.userId);
    if (!(await user)) {
      throw new Exceptions(
        ExceptionType.UnauthorizedException,
        'O cadastro de endereço é somente para empresas ou prestadores de serviço',
      );
    }

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
