import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { NamePickerController } from './name-picker.controller';
import { NameResult } from './name-picker.dto';

export type SwaggerMethodDoc<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export const Docs: SwaggerMethodDoc<NamePickerController> = {
  getName(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiOkResponse({
        type: NameResult,
      })
    );
  },
  pickName(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiCreatedResponse({
        type: NameResult,
      })
    );
  },
};
