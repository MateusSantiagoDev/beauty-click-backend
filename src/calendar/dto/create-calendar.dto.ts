import { ApiProperty } from '@nestjs/swagger';

export class CreateCalendarDto {
  @ApiProperty({
    description: 'Dia disponível para agendamento',
    example: 'segunda-feira',
  })
  day: string;

  @ApiProperty({
    description: 'Horário de início do atendimento',
    example: '08:00hrs'
  })
  startTime: string;

  @ApiProperty({
    description: 'Horário de término do atendimento',
    example: '09:00hrs'
  })
  endTime: string;

  @ApiProperty({
    description: 'Endereço do salão',
  })
  addressId: string;
}
