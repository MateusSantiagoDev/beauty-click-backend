import { PartialType, ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
    // omitindo a chave userId no metodo de update do swagger
    @ApiHideProperty()
    @ApiProperty({ readOnly: true })
    userId: string;
}
