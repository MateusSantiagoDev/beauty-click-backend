import { ApiProperty } from '@nestjs/swagger';

export class CreateServicesDto {
  @ApiProperty({
    description: 'Tipo de serviço',
    example: 'Limpeza de pele',
  })
  name: string;

  @ApiProperty({
    description: 'imagem do serviço',
    example: 'http://foto.com',
  })
  image: string;

  @ApiProperty({
    description: 'Preço do serviço',
    example: '35,00',
  })
  price: string;

  @ApiProperty({
    description: 'ID do usuário com permissão de Perstador de serviço'
  })
  userId: string;
}
