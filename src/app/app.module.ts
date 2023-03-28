import { Module } from '@nestjs/common';
import { AddressModule } from '../address/address.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SignupModule } from '../signup/signup.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, SignupModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
