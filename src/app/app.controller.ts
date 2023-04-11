import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { AppService } from './app.service';

@ApiTags('Status')
@Controller('status')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Status da Aplicação',
  })
  @Get()
  getStatus(): string {
    return this.appService.getStatus();
  }
}
