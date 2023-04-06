import { Module } from "@nestjs/common";
import { ServicesController } from './services.controller';

@Module({
    imports: [],
    controllers: [ServicesController],
    providers: [],
})
export class ServicesModule {};