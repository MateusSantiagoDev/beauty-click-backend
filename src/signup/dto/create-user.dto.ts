import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Cep',
    example: '0000000'
  })
  cep: string;

  @ApiProperty({
    description: 'Bairro',
    example: 'Jardim exemplo'
  })
  district: string;

  @ApiProperty({
    description: 'Rua',
    example: 'Rua exemplo'
  })
  road: string;

  @ApiProperty({
    description: 'número da residência',
    example: 300
  })
  number: number;

  @ApiProperty({
    description: 'ID do usuário ao qual o endereço pertence',
    example: '1234'
  })
  userId: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Mateus'
  })
  name: string;

  @ApiProperty({
    description: 'Email',
    example: 'exemplo@exemplo.com'
  })
  email: string;

  @ApiProperty({
    description: 'CPF',
    example: '00000000000'
  })
  cpf: string;

  @ApiProperty({
    description: 'Senha',
    example: '1234@'
  })
  password: string;

  @ApiProperty({
    description: 'Confirmação da senha',
    example: '1234@'
  })
  confirmPassword: string;

  @ApiProperty({
    description: 'Permissão do usuário',
    example: 'user'
  })
  role: string;

  @ApiProperty({ type: CreateAddressDto })
  address: CreateAddressDto;
}