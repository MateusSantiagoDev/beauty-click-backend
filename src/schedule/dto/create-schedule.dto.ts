import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty({
    description: 'ID do usuário que irá agendar um atendimento',
    example: 'string',
  })
  userId: string;

  @ApiProperty({
    description: 'ID do Estabelecimento',
    example: 'string',
  })
  addressId: string;

  @ApiProperty({
    description: 'nomes dos Serviços que seram agendados',
    example: '["limpeza de pele", "corte degrad"]',
  })
  serviceName: string[];

  @ApiProperty({
    description: 'Dia do agendamento',
    example: '["sexta-feira", "sabado"]',
  })
  day: string[];

  @ApiProperty({
    description: 'Horário do agendamento',
    example: '["08:00:00", "09:00:00", "10:00:00"]',
  })
  startTime: string[];
}
