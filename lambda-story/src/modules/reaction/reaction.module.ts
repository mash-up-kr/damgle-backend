import { Module } from '@nestjs/common';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';

@Module({
  providers: [ReactionService],
  controllers: [ReactionController],
})
export class ReactionModule {}
