import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressLocationRepository {
  constructor(private readonly prisma) {}
}
