import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address-entity';
import { AddressRepository } from './repository/address-repository';
import { ValidationRequiredFields } from '../utils/helpers/required-fields';
import { ValidationMethods } from '../utils/helpers/validation-methods';
import { isCep } from '../utils/helpers/cep-validation';
import { IsValidPhone } from '../utils/helpers/isvalid-phone';

@Injectable()
export class AddressService {
  constructor(private readonly repository: AddressRepository) {}

  async create(dto: CreateAddressDto): Promise<AddressEntity> {
    const requiredFields = [
      'name',
      'image',
      'phones',
      'street',
      'neighborhood',
      'city',
      'state',
      'postalCode',
      'number',
      'userId',
    ];

    ValidationRequiredFields(dto, requiredFields);

    await this.repository.getUserById(dto.userId);

    const isValid = await isCep(dto.postalCode);
    if (!isValid) {
      throw new Exceptions(ExceptionType.InvalidData, 'cep invalido!');
    }

    const address = new ValidationMethods(this.repository, dto);
    if (await address.isNameUnique()) {
      throw new Exceptions(
        ExceptionType.InvalidData,
        'Esse nome já esta sendo utilizado por outra empresa',
      );
    }

    if (!(await address.isAddressUnique())) {
      throw new Exceptions(
        ExceptionType.InvalidData,
        'Já existe um endereço cadastrado com o mesmo bairro, rua e número.',
      );
    }

    const userPhones = await this.repository.getByPhone(dto.phones);

    if (userPhones) {
      const existingPhone = userPhones.phones.find((phone) =>
        dto.phones.includes(phone),
      );
      throw new Exceptions(
        ExceptionType.InvalidData,
        `o telefone ${existingPhone} já esta cadastrado`,
      );
    }

    if (!IsValidPhone(dto.phones) || dto.phones.length === 0) {
      const invalidPhone = dto.phones.find((phone) => !IsValidPhone(phone));
      throw new Exceptions(
        ExceptionType.InvalidData,
        `o telefone ${invalidPhone} é inválido, verifique se o número existe e se esta no formato correto`,
      );
    }

    const addressModel: AddressEntity = {
      id: randomUUID(),
      ...dto,
      phones: Array.isArray(dto.phones) ? dto.phones : [dto.phones],
      createdAt: new Date(),
    };

    const user = address.checkAuthorization(addressModel.userId);
    if (!(await user)) {
      throw new Exceptions(
        ExceptionType.UnauthorizedException,
        'O cadastro de endereço é somente para empresas ou prestadores de serviço',
      );
    }

    const result = await this.repository.create(addressModel);
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

    const allAddress = new ValidationMethods(this.repository, dto);

    if (!(await allAddress.isNameUnique())) {
      throw new Exceptions(
        ExceptionType.InvalidData,
        'Esse nome já esta sendo utilizado por outra empresa',
      );
    }

    if (!(await allAddress.isAddressUnique())) {
      throw new Exceptions(
        ExceptionType.InvalidData,
        'Já existe um endereço cadastrado com o mesmo bairro, rua e número.',
      );
    }

    if (dto.phones) {
      const userPhones = await this.repository.getByPhone(dto.phones);

      if (userPhones) {
        const existingPhone = userPhones.phones.find((phone) =>
          dto.phones.includes(phone),
        );
        throw new Exceptions(
          ExceptionType.InvalidData,
          `o telefone ${existingPhone} já esta cadastrado`,
        );
      }

      if (!IsValidPhone(dto.phones) || dto.phones.length === 0) {
        const invalidPhone = dto.phones.find((phone) => !IsValidPhone(phone));
        throw new Exceptions(
          ExceptionType.InvalidData,
          `o telefone ${invalidPhone} é inválido, verifique se o número existe e se esta no formato correto`,
        );
      }
      dto.phones = Array.isArray(dto.phones) ? dto.phones : [dto.phones];
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
