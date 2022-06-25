import { Injectable } from '@nestjs/common';

@Injectable()
export class NamePickerService {
  getHello(): string {
    return 'Hello World!';
  }
}
