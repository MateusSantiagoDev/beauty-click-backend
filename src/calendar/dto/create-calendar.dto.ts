import { ApiProperty } from '@nestjs/swagger';

export class CreateCalendarDto {
  @ApiProperty({
    description: 'Datas',
  })
  date: string;

  @ApiProperty({
    description: 'Horário de início do atendimento',
  })
  startTime: string;

  @ApiProperty({
    description: 'Horário de término do atendimento',
  })
  endTime: string;

  @ApiProperty({
    description: 'Endereço do salão',
  })
  address: string[];

  @ApiProperty({
    description: 'ID do cliente',
  })
  user: string[];
}
