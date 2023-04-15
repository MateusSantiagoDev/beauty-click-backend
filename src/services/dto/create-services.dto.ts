import { ApiProperty } from '@nestjs/swagger';

export class CreateServicesDto {
  @ApiProperty({
    description: 'ID do endereço da empresa que presta o serviço',
  })
  addressId: string;

  @ApiProperty({
    description: 'Tipo de serviço',
    example: 'limpeza de pele',
  })
  serviceName: string;

  @ApiProperty({
    description: 'imagens do serviço',
    example: '[ "http://foto1.com", "http://foto2.com" ]',
  })
  images: string[];

  @ApiProperty({
    description: 'Preço do serviço',
    example: '35,00',
  })
  price: string;
}
