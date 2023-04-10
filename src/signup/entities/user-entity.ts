import { ServicesEntity } from '../../services/entities/services-entity';
import { AddressEntity } from '../../address/entities/address-entity';

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  cpf: string;
  contact: string;
  password: string;
  role: string;
  address?: AddressEntity[];
  services?: ServicesEntity[];
  createdAt?: Date;
  updatedAt?: Date;
}
