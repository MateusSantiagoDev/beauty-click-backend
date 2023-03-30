import { Injectable } from "@nestjs/common";
import { LocationRepository } from "./repository/location-repository";

@Injectable()
export class LocationService {
    constructor (private readonly repository: LocationRepository) {}
}