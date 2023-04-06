import { Module } from "@nestjs/common";
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ServicesRepository } from './repository/services-repository';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [ServicesController],
    providers: [ServicesService, ServicesRepository],
})
export class ServicesModule {};