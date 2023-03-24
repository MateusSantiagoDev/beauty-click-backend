export interface UserEntity {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: string;
  address: Address;
  createdAt: string;
}

export interface Address {
  id: string;
  district: string;
  road: string;
  number: number;
  userId: UserEntity;
}
