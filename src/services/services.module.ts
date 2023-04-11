import { Module } from "@nestjs/common";
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ServicesRepository } from './repository/services-repository';
import { PrismaModule } from "../prisma/prisma.module";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' }),],
    controllers: [ServicesController],
    providers: [ServicesService, ServicesRepository],
})
export class ServicesModule {};