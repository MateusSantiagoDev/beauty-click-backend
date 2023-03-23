import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { AppService } from './app.service';

@ApiTags('Status')
@Controller('status')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus(): string {
    return this.appService.getStatus();
  }
}
