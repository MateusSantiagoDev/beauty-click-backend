import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from '../../signup/entities/user-entity';

@Injectable()
export class LoginRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(email: string): Promise<UserEntity> {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: { email },
      });
    } catch (err) {
      null;
    }
  }
}
