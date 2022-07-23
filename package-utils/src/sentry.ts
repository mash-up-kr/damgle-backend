import * as Sentry from '@sentry/node';
import { getSourceVersion } from './metadata';
let initialized = false;

export function initSentry() {
  Sentry.setContext('sourceVersion', {
    version: getSourceVersion(),
  });

  if (initialized) {
    return;
  }
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  });
  initialized = true;
}

/**
 * @params fn - effect functions
 */
export function withSentryCaptured(fn: () => Promise<void> | void) {
  try {
    const result = fn();
    if (result instanceof Promise) {
      result.catch(e => Sentry.captureException(e));
    }
  } catch (e) {
    Sentry.captureException(e);
  }
}
