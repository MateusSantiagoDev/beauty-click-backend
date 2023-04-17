import { PartialType } from '@nestjs/swagger';
import { CreateAddressLocationDto } from './create-address-location.dto';

export class UpdateAddressLocationDto extends PartialType(
  CreateAddressLocationDto,
) {}
