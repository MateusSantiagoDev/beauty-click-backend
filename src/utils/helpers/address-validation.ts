import { AddressRepository } from '../../address/repository/address-repository';

export class AddressValidation {
  constructor(
    private readonly repository: AddressRepository,
    private readonly value: any
    ) {}

  async ValidAddress(): Promise<boolean> {
    const allAddress = await this.repository.findAll();
    for (const address of allAddress) {
      if (
        address.district === this.value.district &&
        address.road === this.value.road &&
        address.number === this.value.number
        ) {
        return false;
      }
    }
    return true;
  }
}
