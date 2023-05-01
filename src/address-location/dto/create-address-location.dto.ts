import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressLocationDto {
  @ApiProperty({
    description: 'Região onde serão buscados os endereços',
    example: 'santo amaro',
  })
  neighborhood: string;
}
