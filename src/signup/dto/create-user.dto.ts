import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../entities/user-entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'nome de usuário',
  })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
  })
  email: string;

  @ApiProperty({
    description: 'CPF do usuário',
  })
  cpf: string;

  @ApiProperty({
    description: 'Senha do usuário',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmação da senha',
  })
  confirmPassword: string;

  @ApiProperty({
    description: 'permissões de usuário',
  })
  role: string;

  @ApiProperty({
    description: 'Endereço do usuário',
    type: ['Address'],
  })
  address: Address[];
}
