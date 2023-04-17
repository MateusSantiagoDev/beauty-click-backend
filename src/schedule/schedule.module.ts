import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ScheduleController } from "./schedule.controller";
import { ScheduleService } from "./schedule.service";
import { ScheduleRepository } from "./repository/schedule-repository";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
 imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
 controllers: [ScheduleController],
 providers: [ScheduleService, ScheduleRepository],
})
export class ScheduleModule {}