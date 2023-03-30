import { Module } from "@nestjs/common";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";
import { LocationRepository } from "./repository/location-repository";

@Module({
    imports: [],
    controllers: [LocationController],
    providers: [LocationService, LocationRepository],
})
export class LocationModule {}