import { Injectable } from "@nestjs/common";
import { ServicesRepository } from './repository/services-repository';

@Injectable()
export class ServicesService {
    constructor(private readonly repository: ServicesRepository) {}
}