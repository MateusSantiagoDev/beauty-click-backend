import { Module } from "@nestjs/common";
import { AddressLocationController } from "./address-location.controller";
import { AddressLocartionService } from "./address-location.service";

@Module({
  imports: [],
  controllers: [AddressLocationController],
  providers: [AddressLocartionService],
})
export class AddressLocationModule {}
