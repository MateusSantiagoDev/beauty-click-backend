export interface UserEntity {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: string;
  cep: string;
  district: string;
  road: string;
  number: number;
  createdAt?: Date;
  updatedAt?: Date;
}
