import { randomUUID } from 'crypto';
import { AddressEntity } from '../../location/entities/location-entity';

export const LocationModel = (result: any, address: string, id: string): AddressEntity => ({
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
  addressDataId: id,
});
