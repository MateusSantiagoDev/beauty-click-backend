import { Injectable } from '@nestjs/common';
import { AddressLocationRepository } from './repository/address-location-repository';
import { CreateAddressLocationDto } from './dto/create-address-location.dto';
import { AddressLocationEntity } from './entities/address-location-entity';
import { randomUUID } from 'crypto';
import { PlacesLocationApi } from '../utils/database/places-api'; 

@Injectable()
export class AddressLocartionService {
  constructor(private readonly repository: AddressLocationRepository) {}

  async create(
    neighborhood: CreateAddressLocationDto,
  ): Promise<AddressLocationEntity> {
    const result = await PlacesLocationApi(neighborhood, this.repository)

    const places: any = {
      id: randomUUID(),
      ...result,
    };
    return await this.repository.findAll(places);
  } 
}
