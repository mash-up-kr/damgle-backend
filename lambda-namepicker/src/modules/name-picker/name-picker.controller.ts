import { Controller, Get, Param } from '@nestjs/common';
import { NamePickerService } from './name-picker.service';

@Controller()
export class NamePickerController {
  constructor(private readonly namePicker: NamePickerService) {}

  @Get()
  async pickName(): Promise<any> {
    return await this.namePicker.getHello();
  }

  @Get('/:name')
  async getName(@Param('name') name: string): Promise<any> {
    return `Hello, ${name}`;
  }
}
