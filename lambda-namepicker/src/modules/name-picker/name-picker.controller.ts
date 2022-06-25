import { Controller, Get, Param } from '@nestjs/common';
import { NamePickerService } from './name-picker.service';

@Controller()
export class NamePickerController {
  constructor(private readonly appService: NamePickerService) {}

  @Get()
  pickName(): string {
    return this.appService.getHello();
  }

  @Get('/:name')
  getName(@Param('name') name: string): string {
    return `Hello, ${name}`;
  }
}
