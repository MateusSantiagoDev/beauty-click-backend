import { Injectable } from '@nestjs/common';
import { AddressEntity } from './entities/location-entity';
import { LocationRepository } from './repository/location-repository';
import { LocationModel } from '../utils/helpers/location-model';
import { LocationApi } from '../utils/database/location-api';
import { ExtractAddressComponents } from '../utils/helpers/location-address-components';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';
import { Validation } from 'src/utils/exceptions/error/validation';

@Injectable()
export class LocationService {
  constructor(private readonly repository: LocationRepository) {}
  async create(address: string): Promise<AddressEntity> {
    try {
      const response = await LocationApi(address);
      if (response === undefined) {
        throw new Validation('Endereço não encontrado!');
      }

      const addressDto = LocationModel(response, address);

      const addressComponents = ExtractAddressComponents(
        response.address_components,
      );

      Object.assign(addressDto, addressComponents);

      return await this.repository.create(addressDto);
    } catch (err) {
      if (err instanceof Validation) {
        throw new Exceptions(ExceptionType.NotFundData, err.message);
      }
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findAll(): Promise<AddressEntity[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<AddressEntity> {
    return await this.repository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }
}
