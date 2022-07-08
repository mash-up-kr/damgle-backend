import { Injectable } from '@nestjs/common';

@Injectable()
export class NamePickerService {
  constructor() {}

  async getHello(): Promise<any> {
    return 'Hello, World!';
  }
}
