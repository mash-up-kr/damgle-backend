import { Controller, Get } from '@nestjs/common';
import { Docs } from './content.docs';
import { ContentService } from './content.service';

@Controller()
export class ContentController {
  constructor(private readonly content: ContentService) {}

  @Get()
  @Docs.hello('hello')
  async hello() {
    return await this.content.hello();
  }
}
