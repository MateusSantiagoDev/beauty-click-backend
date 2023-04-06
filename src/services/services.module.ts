import { Module } from "@nestjs/common";
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ServicesRepository } from './repository/services-repository';

@Module({
    imports: [],
    controllers: [ServicesController],
    providers: [ServicesService, ServicesRepository],
})
export class ServicesModule {};