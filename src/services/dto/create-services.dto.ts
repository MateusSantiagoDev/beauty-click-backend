import { ApiProperty } from '@nestjs/swagger';

export class CreateServicesDto {
  @ApiProperty({
    description: 'Tipo de serviço',
    example: 'Limpeza de pele',
  })
  name: string;

  @ApiProperty({
    description: 'imagem do serviço',
    example: '[ "http://foto1.com", "http://foto2.com" ]',
  })
  image: string[];

  @ApiProperty({
    description: 'Preço do serviço',
    example: '35,00',
  })
  price: string;

  @ApiProperty({
    description: 'ID do endereço da empresa que presta o serviço',
  })
  addressId: string;
}
