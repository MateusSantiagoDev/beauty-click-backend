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
    description: 'Telefones para contato',
    example: '[ "(11) 99999-9999", "(11) 98888-8888" ]',
  })
  phones: string[];

  @ApiProperty({
    description: 'Cep',
    example: '0000000',
  })
  postalCode: string;

  @ApiProperty({
    description: 'Bairro',
    example: 'Jardim exemplo',
  })
  neighborhood: string;

  @ApiProperty({
    description: 'Rua',
    example: 'Rua exemplo',
  })
  street: string;

  @ApiProperty({
    description: 'número da residência',
    example: 300,
  })
  number: string;

  @ApiProperty({
    description: 'Cidade',
  })
  city: string;

  @ApiProperty({
    description: 'Estado',
  })
  state: string;

  @ApiProperty({
    description: 'ID do usuário com permissão de Perstador de serviço',
  })
  userId: string;
}
