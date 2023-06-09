import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HandleExceptions } from 'src/utils/exceptions/handle-exceptions';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address-entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Address')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('address')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @ApiOperation({
    summary: 'Adicionar um novo endereço',
  })
  @Post()
  async create(@Body() dto: CreateAddressDto): Promise<AddressEntity> {
    try {
      return await this.service.create(dto);
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar todos os endereços',
  })
  @Get()
  async findAll(): Promise<AddressEntity[]> {
    try {
      return await this.service.findAll();
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar um endereço por ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AddressEntity> {
    try {
      return await this.service.findOne(id);
    } catch (err) {
      HandleExceptions(err);
    }
  }
  
  @ApiOperation({
    summary: 'Atualizar um endereço por ID',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAddressDto,
  ): Promise<AddressEntity> {
    try {
      return await this.service.update(id, dto);
    } catch (err) {
      HandleExceptions(err);
    }
  }

  @ApiOperation({
    summary: 'Remover um endereço por ID',
  })
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
