export type ErrorOptions = { cause?: any; statusCode?: number; [additional: string]: any };

export enum ErrorType {
  SYSTEM = 'SYSTEM',
  USER = 'USER',
  EXTERNAL = 'EXTERNAL',
}

export type ErrorMessageParams<
  Message extends string,
  // eslint-disable-next-line
  Arguments = {}
> = Trim<Message> extends `${infer Prefix}{{${infer Arg}}}${infer Postfix}`
  ? {
      [K in Arg]: string | number | boolean;
    } & ErrorMessageParams<`${Trim<Prefix>}${Trim<Postfix>}`>
  : Arguments;

type Whitespace = '\n' | ' ';
type Trim<T> = T extends `${Whitespace}${infer U}` ? Trim<U> : T extends `${infer U}${Whitespace}` ? Trim<U> : T;
