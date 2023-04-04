export class AddressEntity {
  id: string;
  address: string;
  latitude: string;
  longitude: string;
  formattedAddress: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}
