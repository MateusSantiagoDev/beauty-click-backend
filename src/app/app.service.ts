import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): string {
    return 'servidor rodando em http://localhost:3000';
  }
}
