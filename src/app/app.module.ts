import { Module } from '@nestjs/common';
import { LocationModule } from '../location/location.module'; 
import { AddressModule } from '../address/address.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SignupModule } from '../signup/signup.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, SignupModule, AddressModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
