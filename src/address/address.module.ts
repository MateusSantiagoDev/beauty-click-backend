import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AddressController } from "./address.controller";
import { AddressService } from "./address.service";
import { AddressRepository } from "./repository/address-repository";
import { LocationModule } from "../location/location.module";

@Module({
    imports: [PrismaModule, LocationModule],
    controllers: [AddressController],
    providers: [AddressService, AddressRepository],
    exports: [AddressRepository],
})
export class AddressModule {}