import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../signup/entities/user-entity';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Token do usuário',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzdWFyaW9AdXN1YXJpby5jb20iLCJpYXQiOjE2NzA4MDQyOTksImV4cCI6MTY3MDg5MDY5OX0.ByzeJsI2Uptz5X6-Ku8m-lJqS8I08bPE9Mm1Te9hh1w',
  })
  token: string;

  @ApiProperty({
    description: 'Dados do usuário autenticado',
  })
  user: UserEntity;
}
