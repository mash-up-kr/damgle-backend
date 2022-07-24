import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ReactionController } from './reaction.controller';

export type SwaggerMethodDoc<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export const Docs: SwaggerMethodDoc<ReactionController> = {
  findReactions(summary: string) {
    return applyDecorators(
      ApiOperation({ summary })
      // ApiOkResponse({type: NameResult})
    );
  },
};
