import { Injectable } from '@nestjs/common';

@Injectable()
export class StoryService {
  constructor() {}

  async hello() {
    return true;
  }
}
