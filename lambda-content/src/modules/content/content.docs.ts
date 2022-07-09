import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ContentController } from './content.controller';

export type SwaggerMethodDoc<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export const Docs: SwaggerMethodDoc<ContentController> = {
  hello(summary: string) {
    return applyDecorators(
      ApiOperation({ summary })
      // ApiOkResponse({type: NameResult})
    );
  },
};
