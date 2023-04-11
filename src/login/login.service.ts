import { Injectable } from "@nestjs/common";

@Injectable()
export class LoginService {
    constructor(private readonly repository) {}
}