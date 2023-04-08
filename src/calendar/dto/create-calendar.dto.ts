import { ApiProperty } from '@nestjs/swagger';

export class CreateCalendarDto {
  @ApiProperty({
    description: 'Dia disponível para agendamento',
    example: '[segunda-feira, terça-feira, quarta-feira]',
  })
  day: string[];

  @ApiProperty({
    description: 'Horário de início do atendimento',
    example: '[08:00hrs, 09:00hrs, 10:00hrs]',
  })
  startTime: string[];

  @ApiProperty({
    description: 'Endereço do salão',
  })
  addressId: string;
}
