export class AddressLocationEntity {
  id: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
}

export class PlacesEntity {
  id: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  addressLocationId: string;
}
