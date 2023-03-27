import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user-entity';
import { PrismaService } from '../prisma/prisma.service';
import { IsValidEmail } from '../utils/validation-data/validation-email';
import { hash } from 'bcrypt';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';
import { Validation } from 'src/utils/exceptions/error/validation';

@Injectable()
export class SignupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    try {
      const requiredFields = [
        'name',
        'email',
        'cpf',
        'password',
        'confirmPassword',
        'role',
        'cep',
        'district',
        'road',
        'number',
      ];

      for (const field of requiredFields) {
        if (!dto[field]) {
          throw new Validation('Por favor informe todos os campos');
        }
      }
      if (dto.password !== dto.confirmPassword) {
        throw new Error('Senha invalida!');
      }
      delete dto.confirmPassword;

      const isValid = new IsValidEmail(this, dto.email);
      if (!isValid.EmailRegex()) {
        throw new Validation('Email Invalido!');
      }

      if (await isValid.UniqueEmail()) {
        throw new Validation('Email já cadastrado!');
      }

      const userId = randomUUID();
      const addressId = randomUUID();

      const result = await this.prisma.$transaction(async (prisma) => {
        const userData = await prisma.user.create({
          data: {
            id: userId,
            name: dto.name,
            email: dto.email,
            cpf: dto.cpf,
            password: await hash(dto.password, 12),
            role: dto.role,
            createdAt: new Date(),
          },
        });
        const addressData = await prisma.address.create({
          data: {
            id: addressId,
            cep: dto.address.cep,
            district: dto.address.district,
            road: dto.address.road,
            number: dto.address.number,
            user: { connect: { id: userData.id } },
          },
        });
        return { ...userData, address: addressData };
      });

      delete result.updatedAt;

      return result;
    } catch (error) {
      if (error instanceof Validation) {
        throw new Exceptions(ExceptionType.InvalidData, error.message);
      }
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany({
      include: {
        address: true,
      },
    });
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.prisma.user.findFirstOrThrow({
      where: { id },
      include: {
        address: true,
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: { email },
      });
    } catch (error) {
      return null;
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    await this.findOne(id);
    if (dto.password) {
      if (dto.password !== dto.confirmPassword) {
        throw new Error('Senha invalida!');
      }
    }
    delete dto.confirmPassword;
    await hash(dto.password, 12);
    /* 
    if (dto.email) {
      ValidationEmail(this, dto.email);
    } */

    const result = await this.prisma.$transaction(async (prisma) => {
      const userUpdateData = {
        name: dto.name,
        email: dto.email,
        cpf: dto.cpf,
        password: dto.password,
        role: dto.role,
        updatedAt: new Date(),
      };
      const addressUpdateData = {
        cep: dto.address.cep,
        district: dto.address.district,
        road: dto.address.road,
        number: dto.address.number,
      };
      const updatedUser = await prisma.user.update({
        where: { id },
        data: userUpdateData,
      });
      const updatedAddress = await prisma.address.update({
        where: { userId: id },
        data: addressUpdateData,
      });
      return { ...updatedUser, address: updatedAddress };
    });
    return result;
  }

  async delete(id: string) {
    await this.prisma.$transaction(async (prisma) => {
      await prisma.address.delete({
        where: {
          userId: id,
        },
      });
      await prisma.user.delete({ where: { id } });
    });
  }
}
