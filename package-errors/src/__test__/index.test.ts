import { MaximumRequestExceedError, NotAuthenticatedError } from '../index';

describe('Common errors', () => {
  it('can create error', () => {
    const error = new MaximumRequestExceedError({
      operation: 'foo',
      count: 30,
      cause: new Error(''),
      additional1: true,
      additional2: 100,
    });
    expect(error.name).toMatchInlineSnapshot(`"MaximumRequestExceedError"`);
    expect(error.message).toMatchInlineSnapshot(`"foo 요청 제한을 초과했습니다. (max: 30)"`);
    expect(error.cause).toMatchInlineSnapshot(`[Error]`);
    expect(error.debugInfo).toMatchInlineSnapshot(`
      Object {
        "additional1": true,
        "additional2": 100,
        "count": 30,
        "operation": "foo",
      }
    `);
  });

  it('can override message', () => {
    const error = new MaximumRequestExceedError('overrided message', {
      operation: 'foo',
      count: 30,
    });
    expect(error.name).toMatchInlineSnapshot(`"MaximumRequestExceedError"`);
    expect(error.message).toMatchInlineSnapshot(`"overrided message"`);
  });

  it('if message requires no arguments, can be skipped', () => {
    const error = new NotAuthenticatedError();
    expect(error.name).toMatchInlineSnapshot(`"NotAuthenticatedError"`);
    expect(error.message).toMatchInlineSnapshot(`"Authentication token is invalid"`);
  });

  it('can override message requires no arguments', () => {
    const error = new NotAuthenticatedError('overrided message', { cause: new Error('') });
    expect(error.name).toMatchInlineSnapshot(`"NotAuthenticatedError"`);
    expect(error.message).toMatchInlineSnapshot(`"overrided message"`);
    expect(error.cause).toMatchInlineSnapshot(`[Error]`);
  });
});
