import { Injectable } from "@nestjs/common";

@Injectable()
export class ServicesService {
    constructor(private readonly repository) {}
}