import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user-entity';
import { SignupService } from './signup.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HandleExceptions } from '../utils/exceptions/handle-exceptions';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Signup')
@Controller('signup')
export class SignupController {
  constructor(private readonly service: SignupService) {}

  @ApiOperation({
    summary: 'Cadastrar um usuário',
  })
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.service.create(dto);
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar todos os usuário',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.service.findAll();
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar um usuário pelo ID',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    try {
      return await this.service.findOne(id);
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Atualizar um usuário pelo ID',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    try {
      return await this.service.update(id, dto);
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Remover um usuário pelo ID',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.service.delete(id);
    } catch (err) {
      HandleExceptions(err);
    }
  }
}
