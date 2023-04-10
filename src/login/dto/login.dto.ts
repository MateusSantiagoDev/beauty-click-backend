import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'email@mail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password do usuário',
    example: 'secret',
  })
  password: string;
}
