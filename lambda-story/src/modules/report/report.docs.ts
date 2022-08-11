import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { StoryResponseDto } from '../story/dto/story.dto';
import { ReportController } from './report.controller';

export type SwaggerMethodDoc<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export const Docs: SwaggerMethodDoc<ReportController> = {
  reportStory(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary }),
      ApiOkResponse({ type: StoryResponseDto })
    );
  },
  cancelReportStory(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary }),
      ApiOkResponse({ type: StoryResponseDto })
    );
  },
};
