import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { CalendarRepository } from './repository/calendar-repository';

@Module({
  imports: [],
  controllers: [CalendarController],
  providers: [CalendarService, CalendarRepository],
})
export class CalendarModule {}
