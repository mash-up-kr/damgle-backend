import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthController } from './auth.controller';
import { SignInResult, SignUpResult } from './auth.dto';

export type SwaggerMethodDoc<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export const Docs: SwaggerMethodDoc<AuthController> = {
  signUp(summary: string) {
    return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: SignUpResult }));
  },
  signIn(summary: string) {
    return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: SignInResult }));
  },
  me(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary }),
      ApiOkResponse({
        schema: {
          properties: {
            userNo: { type: 'number' },
            nickname: { type: 'string' },
            notification: { type: 'boolean', default: false }
          }
        },
      })
    );
  },
  deleteMe(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({ summary }),
      ApiOkResponse({
        schema: {
          properties: {
            message: { type: 'string' }
          }
        }
      })
    )
  }
};
