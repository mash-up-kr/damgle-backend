import { Logger } from '@nestjs/common';
import stringify from 'fast-safe-stringify';

export function Log() {
  return (target: any, props: any, descriptor: TypedPropertyDescriptor<any>) => {
    const originalFn = descriptor.value;
    const logger = new Logger(props);

    descriptor.value = async function (...args: any[]) {
      try {
        logger.log(['request', stringify(args)].join(' '));
        const result = await originalFn.apply(this, args);
        // logger.log(['success', stringify(result)].join(' '));
        return result;
      } catch (e: any) {
        logger.error([`failure`, e.toString()].join(' '));
        throw e;
      }
    };
  };
}
