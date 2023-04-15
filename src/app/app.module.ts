import { Module } from '@nestjs/common';
import { LocationModule } from '../location/location.module'; 
import { AddressModule } from '../address/address.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SignupModule } from '../signup/signup.module';
import { AppController } from './app.controller';
import { ServicesModule } from '../services/services.module';
import { CalendarModule } from '../calendar/calendar.module';
import { LoginModule } from '../login/login.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, SignupModule, AddressModule, LocationModule, ServicesModule, CalendarModule, LoginModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
