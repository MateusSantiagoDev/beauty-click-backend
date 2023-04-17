import { Controller } from "@nestjs/common";
import { AddressLocartionService } from "./address-location.service";

@Controller()
export class AddressLocationController {
    constructor(private readonly service: AddressLocartionService) {}
}