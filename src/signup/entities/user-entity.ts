export interface UserEntity {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: string;
  address?: AddressEntity;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AddressEntity {
  id: string;
  cep: string;
  district: string;
  road: string;
  number: number;
  userId: string;
}
