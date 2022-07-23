import { createError } from './error.factory';
import { ErrorType } from './error.type';
export { BaseError } from './base.error';

const ErrorOf = {
  User: createError(ErrorType.USER),
  System: createError(ErrorType.SYSTEM),
  External: createError(ErrorType.EXTERNAL),
} as const;

export class NotAuthenticatedError extends ErrorOf.User(
  'Authentication token is invalid',
  403
) {}

export class MaximumRequestExceedError extends ErrorOf.User(
  '{{operation}} 요청 제한을 초과했습니다. (max: {{count}})',
  400
) {}

export class EnvNotFoundError extends ErrorOf.System(
  '{{key}}에 대한 환경변수 {{envKey}}가 존재하지 않습니다',
  500
) {}

export class GoogleSheetDataInvalidError extends ErrorOf.System(
  '{{domain}} 스프레드 시트의 데이터가 잘못되었습니다.',
  500
) {}

export class BadRequestError extends ErrorOf.User(
  '잘못된 요청입니다: {{reason}}',
  400
) {}

export class DuplicatedNickNameError extends ErrorOf.User(
  '닉네임이 중복되었습니다: {{nickname}}',
  400
) {}

export class SignInFailureError extends ErrorOf.User(
  '로그인을 할 수 없습니다: {{reason}}',
  403
) {}
