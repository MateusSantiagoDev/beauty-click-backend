import { Injectable } from "@nestjs/common";
import { SignupRepository } from "./repository/signup.repository";

@Injectable()
export class SignupService {
    constructor (private readonly repository: SignupRepository) {}
}