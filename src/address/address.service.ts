import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address-entity';
import { AddressRepository } from './repository/address-repository';

@Injectable()
export class AddressService {
  constructor(private readonly repository: AddressRepository) {}

  async create(dto: CreateAddressDto): Promise<AddressEntity> {
    const requiredFields = [
      'name',
      'image',
      'cep',
      'district',
      'road',
      'number',
      'userId',
    ];

    for (const field of requiredFields) {
      if (!dto[field]) {
        throw new Exceptions(
          ExceptionType.InvalidData,
          'por favor Informe todos os campos',
        );
      }
    }

    const allAddess = await this.repository.findAll();
    for (const address of allAddess) {
      if (
        address.district === dto.district &&
        address.road === dto.road &&
        address.number === dto.number
      ) {
        throw new Exceptions(
          ExceptionType.InvalidData,
          'Já existe um endereço cadastrado com o mesmo bairro, rua e número.',
        );
      }
    }

    const uniqueField = await this.repository.findByName(dto.name);
    if (uniqueField && uniqueField.userId !== dto.userId) {
      throw new Exceptions(
        ExceptionType.InvalidData,
        'Esse nome já esta sendo utilizado por outra empresa',
      );
    }


    const address: AddressEntity = {
      ...dto,
      id: randomUUID(),
      createdAt: new Date(),
    };

    const user = await this.repository.getUserById(address.userId);
    if (user.role === 'serviceProvider') {
      address.userId = user.id;
    } else {
      throw new Exceptions(
        ExceptionType.UnauthorizedException,
        'O cadastro de endereço é somente para empresas ou prestadores de serviço',
      );
    }

    const result = await this.repository.create(address);
    delete result.updatedAt;
    return result;
  }

  async findAll(): Promise<AddressEntity[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<AddressEntity> {
    return await this.repository.findOne(id);
  }

  async update(id: string, dto: UpdateAddressDto): Promise<AddressEntity> {
    await this.findOne(id);

    const allAddess = await this.repository.findAll();
    for (const address of allAddess) {
      if (
        address.district === dto.district &&
        address.road === dto.road &&
        address.number === dto.number
      ) {
        throw new Exceptions(
          ExceptionType.InvalidData,
          'Já existe um endereço cadastrado com o mesmo bairro, rua e número.',
        );
      }
    }

    const uniqueField = await this.repository.findByName(dto.name);
    if (uniqueField && uniqueField.userId !== dto.userId) {
      throw new Exceptions(
        ExceptionType.InvalidData,
        'Esse nome já esta sendo utilizado por outra empresa',
      );
    }

    const address: Partial<AddressEntity> = {
      ...dto,
      updatedAt: new Date(),
    };
    return await this.repository.update(id, address);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }
}
