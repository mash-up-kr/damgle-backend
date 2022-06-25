import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class NamePickerController {
  constructor(private readonly appService: AppService) {}

  @Get()
  pickName(): string {
    return this.appService.getHello();
  }

  @Get('/:name')
  getName(@Param('name') name: string): string {
    return `Hello, ${name}`;
  }
}
