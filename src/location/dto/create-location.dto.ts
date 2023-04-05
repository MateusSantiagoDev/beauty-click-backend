import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Informe um endereço completo ou um cep',
    example: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',

  })
  address: string;
}


