import { ApiProperty, PartialType, ApiHideProperty } from '@nestjs/swagger';
import { CreateScheduleDto } from './create-schedule.dto';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
  @ApiHideProperty()
  @ApiProperty({ readOnly: true })
  userId: string;

  @ApiHideProperty()
  @ApiProperty({ readOnly: true })
  addressId: string;

  @ApiHideProperty()
  @ApiProperty({ readOnly: true })
  calendarId: string;
}
