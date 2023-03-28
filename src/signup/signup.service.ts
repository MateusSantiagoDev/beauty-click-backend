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
import { Validation } from 'src/utils/exceptions/error/validation';

@Injectable()
export class SignupService {
  constructor(private readonly repository: SignupRepository) {}

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
        throw new Validation('Senha invalida!');
      }
      delete dto.confirmPassword;

      const isValid = new IsValidEmail(this, dto.email);
      if (!isValid.EmailRegex()) {
        throw new Validation('Email Invalido!');
      }

      if (await isValid.UniqueEmail()) {
        throw new Validation('Email já cadastrado!');
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
    } catch (error) {
      if (error instanceof Validation) {
        throw new Exceptions(ExceptionType.InvalidData, error.message);
      }
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.repository.findByEmail(email);
    } catch (error) {
      return null
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      return await this.repository.findOne(id);
    } catch (error) {
      throw new Exceptions(ExceptionType.NotFundexception);
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    try {
      await this.findOne(id);
      if (dto.password) {
        if (dto.password !== dto.confirmPassword) {
          throw new Validation('Senha invalida!');
        }
        await hash(dto.password, 12)
      }
      delete dto.confirmPassword;

      if (dto.email) {
        const isValid = new IsValidEmail(this, dto.email);
        if (!isValid.EmailRegex()) {
          throw new Validation('Email Invalido!');
        }

        if (await isValid.UniqueEmail()) {
          throw new Validation('Email já cadastrado!');
        }
      }

      const user: Partial<UserEntity> = {
        ...dto,
        updatedAt: new Date(),
      }

      return await this.repository.update(id, user);

    } catch (error) {
      if (error instanceof Validation) {
        throw new Exceptions(ExceptionType.InvalidData, error.message);
      }
      throw new Exceptions(ExceptionType.InternalServerErrorException);
    }
  }

  async delete(id: string) {
    try {
      await this.findOne(id);

      await this.repository.delete(id);
    } catch (error) {
      throw new Exceptions(ExceptionType.UnprocessableEntityException);
    }
  }
}
