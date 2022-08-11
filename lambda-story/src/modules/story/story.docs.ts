import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { StoryListResponseDto } from './dto/story-list.dto';
import { StoryResponseDto } from './dto/story.dto';
import { StoryController } from './story.controller';

export type SwaggerMethodDoc<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export const Docs: SwaggerMethodDoc<StoryController> = {
  createStory(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary }),
      ApiOkResponse({ type: StoryResponseDto })
    );
  },
  getStoryOfId(summary: string) {
    return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: StoryResponseDto }));
  },
  getStoriesOfMine(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary }),
      ApiOkResponse({ type: StoryListResponseDto })
    );
  },
  getStoryFeeds(summary: string) {
    return applyDecorators(
      ApiOperation({ summary }),
      ApiOkResponse({ type: StoryListResponseDto })
    );
  },
  reactToStory(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary }),
      ApiOkResponse({ type: StoryResponseDto })
    );
  },
  removeReactionOfStory(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary }),
      ApiOkResponse({ type: StoryResponseDto })
    );
  },
};
