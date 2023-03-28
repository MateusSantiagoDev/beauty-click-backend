import { AddressEntity } from '../../address/entities/address-entity';

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: string;
  address?: AddressEntity[];
  createdAt?: Date;
  updatedAt?: Date;
}
