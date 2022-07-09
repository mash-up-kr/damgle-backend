import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async hello() {
    return true;
  }
}
