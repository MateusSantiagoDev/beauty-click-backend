import { Injectable } from '@nestjs/common';
import { AddressEntity } from './entities/location-entity';
import { LocationRepository } from './repository/location-repository';
import { randomUUID } from 'crypto';
import { LocationMethod } from '../utils/database/location-api';

@Injectable()
export class LocationService {
  constructor(private readonly repository: LocationRepository) {}
  async create(address: string): Promise<AddressEntity> {

    const response = await LocationMethod(address)

    if (response.data.results && response.data.results.length > 0) {
      const result = response.data.results[0];

      const addressDto: AddressEntity = {
        id: randomUUID(),
        address: address,
        latitude: result.geometry.location.lat.toString(),
        longitude: result.geometry.location.lng.toString(),
        formattedAddress: result.formatted_address,
        street: null,
        number: null,
        neighborhood: null,
        postalCode: null,
        city: null,
        state: null,
        country: null,
        createdAt: new Date(),
      };

      result.address_components.forEach((component) => {
        if (component.types.includes('locality')) {
          addressDto.city = component.long_name;
        }

        if (component.types.includes('administrative_area_level_1')) {
          addressDto.state = component.long_name;
        }

        if (
          component.types.includes('sublocality_level_1') ||
          component.types.includes('neighborhood')
        ) {
          addressDto.neighborhood = component.long_name;
        }

        if (component.types.includes('postal_code')) {
          addressDto.postalCode = component.long_name;
        }

        if (component.types.includes('country')) {
          addressDto.country = component.long_name;
        }
      });
      return await this.repository.create(addressDto);
    } else {
      throw new Error('Endereço não encontrado');
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
