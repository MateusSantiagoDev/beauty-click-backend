import { AddressRepository } from '../../address/repository/address-repository';

export class AddressValidation {
  constructor(
    private readonly repository: AddressRepository,
    private readonly value: any,
  ) {}

  async isAddressUnique(): Promise<boolean> {
    const allAddress = await this.repository.findAll();
    const foundAddress = allAddress.find(
      (address) =>
        address.district === this.value.district &&
        address.road === this.value.road &&
        address.number === this.value.number,
    );
    return !foundAddress;
  }

  async isNameUnique(): Promise<boolean> {
    const uniqueField = await this.repository.findByName(this.value.name);
    return uniqueField && uniqueField.userId !== this.value.userId;
  }

  async checkAuthorization(value: string): Promise<string> {
    const user = await this.repository.getUserById(value);
    if (user.role === 'serviceProvider') {
      return user.id;
    }
  }
}
