import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { HandleExceptions } from '../utils/exceptions/handle-exceptions';
import { UserEntity } from '../signup/entities/user-entity';
import { LoggedUser } from './decorator/logged-user-decorator';
import { IsValidUserAuthorization } from './decorator/isvalid-user-authorization-decorator';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @ApiOperation({
    summary: 'Login de usuário',
  })
  // gera o jwt
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    try {
      return await this.service.login(dto);
    } catch (err) {
      HandleExceptions(err)
    }
  }

  @ApiOperation({
    summary: 'Retorna o usuário autenticado',
  })
  // valida o jwt
  @Get()
  @UseGuards(AuthGuard(), IsValidUserAuthorization)
  @ApiBearerAuth()
  authenticatedUser(@LoggedUser() user: UserEntity) {
   return user
  }
}
