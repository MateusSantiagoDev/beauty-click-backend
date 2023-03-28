import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SignupRepository } from './repository/signup-repository';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';

@Module({
  imports: [PrismaModule],
  controllers: [SignupController],
  providers: [SignupService, SignupRepository],
  exports: [SignupService],
})
export class SignupModule {}
