import { Injectable } from '@nestjs/common';
import { LocationEntity } from './entities/location-entity';
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
  async create(address: string): Promise<LocationEntity> {
    try {
      // removo o id do parametro address
      const [id, ...params] = address.split(',');

      // transforma novamente em uma única string
      const addressString = params.join(',');

      const response = await LocationApi(addressString);

      if (response === undefined) {
        throw new Validation('Endereço não encontrado!');
      }
      // .trim() no id para remover os espaços
      const addressDto = LocationModel(response, addressString, id.trim());

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

  async findAll(): Promise<LocationEntity[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<LocationEntity> {
    return await this.repository.findOne(id);
  }
}
