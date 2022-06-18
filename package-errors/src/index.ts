import { createError } from './error.factory';
import { ErrorType } from './error.type';

const ErrorOf = {
  User: createError(ErrorType.USER),
  System: createError(ErrorType.SYSTEM),
  External: createError(ErrorType.EXTERNAL),
} as const;

export class NotAuthenticatedError extends ErrorOf.User('Authentication token is invalid', 403) {}

export class MaximumRequestExceedError extends ErrorOf.User(
  '{{operation}} 요청 제한을 초과했습니다. (max: {{count}})',
  400
) {}
