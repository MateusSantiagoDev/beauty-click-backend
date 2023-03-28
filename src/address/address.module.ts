import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AddressService } from "./address.service";
import { AddressRepository } from "./repository/address-repository";

@Module({
    imports: [PrismaModule],
    providers: [AddressService, AddressRepository],
})
export class AddressModule {}