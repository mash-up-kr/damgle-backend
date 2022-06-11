import { Handler } from 'aws-lambda';
import { helloWorld } from '@damgle/utils';

void helloWorld;

const handler: Handler<{ name: string }, { message: string }> = async event => {
  return {
    message: `Hello ${event.name}!`,
  };
};

export { handler };
