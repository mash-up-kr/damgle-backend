import { Controller, Get } from '@nestjs/common';
import { Docs } from './reaction.docs';
import { ReactionService } from './reaction.service';

@Controller()
export class ReactionController {
  constructor(private readonly reaction: ReactionService) {}

  @Get()
  async findReactions() {}
}
