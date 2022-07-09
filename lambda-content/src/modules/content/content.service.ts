import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentService {
  constructor() {}

  async hello() {
    return true;
  }
}
