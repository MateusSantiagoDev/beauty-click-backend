export interface AddressEntity {
  id: string;
  name: string;
  image: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
