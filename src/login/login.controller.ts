import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @ApiOperation({
    summary: 'Login de usuário',
  })
  @Post()
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    try {
      return await this.service.login(dto);
    } catch (err) {}
  }
}
