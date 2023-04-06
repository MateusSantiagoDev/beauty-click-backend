import { PartialType, ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CreateServicesDto } from './create-services.dto';

export class UpdateServicesDto extends PartialType(CreateServicesDto) {
  // omitindo a chave userId no metodo de update do swagger
  @ApiHideProperty()
  @ApiProperty({ readOnly: true })
  userId: string;
}
