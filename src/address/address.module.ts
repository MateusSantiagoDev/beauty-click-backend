import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AddressController } from "./address.controller";
import { AddressService } from "./address.service";
import { AddressRepository } from "./repository/address-repository";

@Module({
    imports: [PrismaModule],
    controllers: [AddressController],
    providers: [AddressService, AddressRepository],
    exports: [AddressRepository],
})
export class AddressModule {}