import { Controller, Get } from '@nestjs/common';
import { Docs } from './auth.docs';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get()
  @Docs.hello('hello')
  async hello() {
    return await this.auth.hello();
  }
}
