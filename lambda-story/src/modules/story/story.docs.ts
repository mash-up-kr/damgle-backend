import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { StoryController } from './story.controller';

export type SwaggerMethodDoc<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export const Docs: SwaggerMethodDoc<StoryController> = {
  createStory(summary: string) {
    return applyDecorators(
      ApiOperation({ summary })
      // ApiOkResponse({type: NameResult})
    );
  },
  getStoriesForIds(summary: string) {
    return applyDecorators(
      ApiOperation({ summary })
      // ApiOkResponse({type: NameResult})
    );
  },
  getStoriesOfMine(summary: string) {
    return applyDecorators(
      ApiOperation({ summary })
      // ApiOkResponse({type: NameResult})
    );
  },
  getStoryOfId(summary: string) {
    return applyDecorators(
      ApiOperation({ summary })
      // ApiOkResponse({type: NameResult})
    );
  },
};
