import { Injectable } from '@nestjs/common';
import { AddressEntity } from './entities/location-entity';
import { LocationRepository } from './repository/location-repository';
import { LocationModel } from '../utils/helpers/location-model';
import { LocationApi } from '../utils/database/location-api';
import { ExtractAddressComponents } from '../utils/helpers/location-address-components';
import { Validation } from '../utils/exceptions/error/validation';

@Injectable()
export class LocationService {
  constructor(private readonly repository: LocationRepository) {}
  async create(address: string): Promise<AddressEntity> {

    
    const response = await LocationApi(address);

    if (response.data.results && response.data.results.length > 0) {
      const result = response.data.results[0];

      const addressDto = LocationModel(result, address);

      const addressComponents = ExtractAddressComponents(
        result.address_components,
      );

      Object.assign(addressDto, addressComponents);

      return await this.repository.create(addressDto);
    } else {
      throw new Validation('Endereço não encontrado');
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
