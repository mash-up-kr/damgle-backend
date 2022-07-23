import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { NamePickerController } from './name-picker.controller';
import { NameResult } from './name-picker.dto';

export type SwaggerMethodDoc<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export const Docs: SwaggerMethodDoc<NamePickerController> = {
  getName(summary: string) {
    return applyDecorators(
      ApiQuery({
        name: 'adjective',
        type: String,
        description: '형용사, optional',
        required: false,
      }),
      ApiQuery({
        name: 'noun',
        type: String,
        description: '명사, optional',
        required: false,
      }),
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
