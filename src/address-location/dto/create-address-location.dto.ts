import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressLocationDto {
  @ApiProperty({
    description: 'Região onde serão buacados os endereços',
    example: 'santo amaro, sp',
  })
  region: string;

  @ApiProperty({
    description: 'Serviços que serão buscados',
    example: '["limpeza de pele", "corte e barba"]',
  })
  services: string[];
}
