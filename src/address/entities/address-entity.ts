import { UserEntity } from '../../signup/entities/user-entity';

export interface AddressEntity {
  id: string;
  name: string;
  image: string;
  cep: string;
  district: string;
  road: string;
  number: number;
  userId?: UserEntity[];
  createdAt?: Date;
  updatedAt?: Date;
}
