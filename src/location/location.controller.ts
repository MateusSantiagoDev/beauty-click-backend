import { Controller } from "@nestjs/common";
import { LocationService } from "./location.service";

@Controller()
export class LocationController {
    constructor (private readonly service: LocationService) {}
}