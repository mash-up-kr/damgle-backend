import createHandler, { PromiseHandler } from '@fastify/aws-lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { bootstrap } from './bootstrap';

let proxy: PromiseHandler;

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  if (!proxy) {
    const { instance } = await bootstrap();
    proxy = createHandler(instance);
  }
  return proxy(event, context);
};

module.exports = {
  handler,
};
