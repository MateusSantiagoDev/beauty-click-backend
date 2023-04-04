import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({
    description: 'Informe um endereço completo ou um cep',
    example: '"1600 Amphitheatre Parkway, Mountain View, CA", "01001-000"',

  })
  address: string;
}


