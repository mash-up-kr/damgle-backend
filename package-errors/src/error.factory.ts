import is from '@sindresorhus/is';
import { BaseError } from './base.error';
import { ErrorType, ErrorOptions, ErrorMessageParams } from './error.type';

export function createError(errorType: ErrorType) {
  return <M extends string>(
    defaultMessage: M,
    defaultStatusCode = 500
  ): ErrorMessageParams<M> extends { [key: string | symbol | number]: never }
    ? {
        new (message: string, option?: ErrorOptions): BaseError;
        new (message?: string): BaseError;
      }
    : {
        new (option: ErrorOptions & ErrorMessageParams<M>): BaseError;
        new (message: string, option: ErrorOptions & ErrorMessageParams<M>): BaseError;
      } => {
    return class extends BaseError {
      type = errorType;

      constructor(arg1 = defaultMessage, arg2?: any) {
        const message = is.string(arg1) ? maybeInterpolate(arg1, arg2) : maybeInterpolate(defaultMessage, arg1);
        const {
          cause,
          statusCode = defaultStatusCode,
          ...debugInfo
        }: ErrorOptions = (is.object(arg1) ? arg1 : arg2) ?? {};

        super(message, statusCode, debugInfo, cause);
        this.name = this.constructor.name;
      }
    } as any;
  };
}

function maybeInterpolate(message: string, options: Record<string, string> = {}) {
  return message.replace(/{{([a-zA-Z0-9_-]+)}}/g, (_: string, matched: string) => {
    return options[matched];
  });
}
