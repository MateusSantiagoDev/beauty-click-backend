import { Injectable } from "@nestjs/common";
import { AddressRepository } from "./repository/address-repository";

@Injectable()
export class AddressService {
    constructor(private readonly repository: AddressRepository) {}
}