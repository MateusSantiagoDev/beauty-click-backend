import { PartialType, ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { CreateCalendarDto } from './create-calendar.dto';

export class UpdateCalendarDto extends PartialType(CreateCalendarDto) {
  @ApiHideProperty()
  @ApiProperty({ readOnly: true })
  addressId: string;
}
