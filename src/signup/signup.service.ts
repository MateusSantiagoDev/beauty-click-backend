import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user-entity';
import { PrismaService } from '../prisma/prisma.service';
import { ValidationEmail } from '../utils/unique-data-validation/unique-email';

@Injectable()
export class SignupService {
  constructor(
    private readonly prisma: PrismaService,
    ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    if (dto.password !== dto.confirmPassword) {
      throw new Error('Senha invalida!');
    }
    delete dto.confirmPassword;

    ValidationEmail(this, dto.email)

    const userId = randomUUID();
    const addressId = randomUUID();

    const result = await this.prisma.$transaction(async (prisma) => {
      const userData = await prisma.user.create({
        data: {
          id: userId,
          name: dto.name,
          email: dto.email,
          cpf: dto.cpf,
          password: dto.password,
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
    return await this.prisma.user.findFirstOrThrow({
      where: { email },
    });
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    await this.findOne(id);
    if (dto.password) {
      if (dto.password !== dto.confirmPassword) {
        throw new Error('Senha invalida!');
      }
    }
    delete dto.confirmPassword;
    
    if (dto.email) {
      ValidationEmail(this, dto.email)
    }

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
