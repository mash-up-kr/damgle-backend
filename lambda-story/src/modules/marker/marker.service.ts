import { Injectable } from '@nestjs/common';

@Injectable()
export class MarkerService {
  constructor() {}

  async hello() {
    return true;
  }
}
