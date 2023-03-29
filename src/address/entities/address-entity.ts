export interface AddressEntity {
  id: string;
  name: string;
  image: string;
  cep: string;
  district: string;
  road: string;
  number: number;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
