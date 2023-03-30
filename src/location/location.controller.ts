import { Controller } from "@nestjs/common";

@Controller()
export class LocationController {
    constructor (private readonly service) {}
}