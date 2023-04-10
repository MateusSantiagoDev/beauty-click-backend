import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { SignupRepository } from './repository/signup-repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user-entity';
import { IsValidEmail } from '../utils/validation-data/validation-email';
import { Exceptions } from 'src/utils/exceptions/exception';
import { ExceptionType } from 'src/utils/exceptions/exceptions-protocols';

@Injectable()
export class SignupService {
  constructor(private readonly repository: SignupRepository) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const requiredFields = [
      'name',
      'email',
      'cpf',
      'contact',
      'password',
      'confirmPassword',
      'role',
    ];

    for (const field of requiredFields) {
      if (!dto[field]) {
        throw new Exceptions(
          ExceptionType.InvalidData,
          'por favor Informe todos os campos',
        );
      }
    }
    if (dto.password !== dto.confirmPassword) {
      throw new Exceptions(ExceptionType.InvalidData, 'Senha Invalida!');
    }
    delete dto.confirmPassword;

    const isValid = new IsValidEmail(this, dto.email);
    if (!isValid.EmailRegex()) {
      throw new Exceptions(ExceptionType.NotFundData, 'Email invalido!');
    }

    if (await isValid.UniqueEmail()) {
      throw new Exceptions(ExceptionType.NotFundData, 'Email já cadastrado!');
    }

    const user: UserEntity = {
      ...dto,
      id: randomUUID(),
      password: await hash(dto.password, 12),
      createdAt: new Date(),
    };
    const result = await this.repository.create(user);
    delete result.updatedAt;
    return result;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.findAll();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findByEmail(email);
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.repository.findOne(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    await this.findOne(id);

    if (dto.password) {
      if (dto.password !== dto.confirmPassword) {
        throw new Exceptions(ExceptionType.InvalidData, 'Senha Invalida!');
      }
      await hash(dto.password, 12);
    }
    delete dto.confirmPassword;

    if (dto.email) {
      const isValid = new IsValidEmail(this, dto.email);
      if (!isValid.EmailRegex()) {
        throw new Exceptions(ExceptionType.NotFundData, 'Email invalido!');
      }

      if (await isValid.UniqueEmail()) {
        throw new Exceptions(ExceptionType.NotFundData, 'Email já cadastrado!');
      }
    }

    const user: Partial<UserEntity> = {
      ...dto,
      updatedAt: new Date(),
    };

    return await this.repository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }
}
