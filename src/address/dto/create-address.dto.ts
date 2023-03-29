import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Nome do salão',
    example: 'Salão nota 10',
  })
  name: string;

  @ApiProperty({
    description: 'Imagem do salão',
    example: 'http://foto.com',
  })
  image: string;

  @ApiProperty({
    description: 'Cep',
    example: '0000000',
  })
  cep: string;

  @ApiProperty({
    description: 'Bairro',
    example: 'Jardim exemplo',
  })
  district: string;

  @ApiProperty({
    description: 'Rua',
    example: 'Rua exemplo',
  })
  road: string;

  @ApiProperty({
    description: 'número da residência',
    example: 300,
  })
  number: number;

  @ApiProperty({
    description: 'ID do usuário com permissão de Perstador de serviço'
  })
  userId: string;
}
