import { Injectable } from '@nestjs/common';

@Injectable()
export class ReactionService {
  constructor() {}

  async hello() {
    return true;
  }
}
