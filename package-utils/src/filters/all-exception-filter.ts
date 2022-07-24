import { BaseError } from '@damgle/errors';
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import Sentry from '@sentry/node';
// import type { Response } from 'express';
import { staticEnv } from '../env.static';

// Ignore express type;
type Response = any;

export enum ErrorKind {
  Http = 'http',
  Custom = 'custom',
  Unknown = 'unknown',
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { kind, message, status } = this.parseErrorKind(error);

    if (staticEnv.node_env === 'local') {
      console.error(error);
    }

    if (kind === ErrorKind.Unknown) {
      // report unknown error to sentry
      Sentry.captureException(error);
    }

    response.status(status).json({ message, status });
  }

  private parseErrorKind(error: any) {
    if (error instanceof BaseError) {
      return {
        kind: ErrorKind.Custom,
        status: error.statusCode,
        message: error.message,
      };
    }

    if (typeof error.getStatus === 'function') {
      // HttpException instanceof 검사가 제대로 안됨. 아마 import하는 객체가 다른듯?
      return {
        kind: ErrorKind.Custom,
        status: error.getStatus(),
        message: Array.isArray(error.response?.message) ? error.response.message.join('\n') : error.message,
      };
    }

    return {
      kind: ErrorKind.Unknown,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unknown server error occurred',
    };
  }
}
