import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user-entity';
import { SignupService } from './signup.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HandleExceptions } from '../utils/exceptions/handle-exceptions';

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
    } catch (error) {
      HandleExceptions(error)
    }
  }

  @ApiOperation({
    summary: 'Buscar todos os usuário',
  })
  @Get()
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.service.findAll();
    } catch (error) {
      HandleExceptions(error)
    }
  }

  @ApiOperation({
    summary: 'Buscar um usuário pelo ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    try {
      return await this.service.findOne(id);
    } catch (error) {
      HandleExceptions(error)
    }
  }

  @ApiOperation({
    summary: 'Atualizar um usuário pelo ID',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    try {
      return await this.service.update(id, dto);
    } catch (error) {
      HandleExceptions(error)
    }
  }

  @ApiOperation({
    summary: 'Remover um usuário pelo ID',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.service.delete(id);
    } catch (error) {
      HandleExceptions(error)
    }
  }
}
