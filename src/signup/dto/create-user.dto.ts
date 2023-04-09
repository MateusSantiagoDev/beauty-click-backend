import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Mateus',
  })
  name: string;

  @ApiProperty({
    description: 'Email',
    example: 'exemplo@exemplo.com',
  })
  email: string;

  @ApiProperty({
    description: 'CPF',
    example: '00000000000',
  })
  cpf: string;

  @ApiProperty({
    description: 'telefone para contato',
    example: '11999999999',
  })
  contact: string;

  @ApiProperty({
    description: 'Senha',
    example: '1234@',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmação da senha',
    example: '1234@',
  })
  confirmPassword: string;

  @ApiProperty({
    description: 'Permissão do usuário',
    example: 'user',
  })
  role: string;  
}
