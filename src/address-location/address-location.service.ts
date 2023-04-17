import { Injectable } from '@nestjs/common';
import { AddressLocationRepository } from './repository/address-location-repository';

@Injectable()
export class AddressLocartionService {
  constructor(private readonly repository: AddressLocationRepository) {}
}
