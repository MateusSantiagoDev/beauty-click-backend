import { Module } from "@nestjs/common";
import { AddressLocationController } from "./address-location.controller";

@Module({
  imports: [],
  controllers: [AddressLocationController],
  providers: [],
})
export class AddressLocationModule {}
