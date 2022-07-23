import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { StoryController } from './story.controller';

export type SwaggerMethodDoc<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export const Docs: SwaggerMethodDoc<StoryController> = {
  hello(summary: string) {
    return applyDecorators(
      ApiOperation({ summary })
      // ApiOkResponse({type: NameResult})
    );
  },
};
