import { Controller, Get } from '@nestjs/common';
import { Docs } from './story.docs';
import { StoryService } from './story.service';

@Controller()
export class StoryController {
  constructor(private readonly story: StoryService) {}

  @Get()
  @Docs.hello('hello')
  async hello() {
    return await this.story.hello();
  }
}
