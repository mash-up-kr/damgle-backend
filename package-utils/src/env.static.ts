import { EnvNotFoundError } from '@damgle/errors';

export const staticEnvKeys = [
  's3_public_bucket',
  's3_private_bucket',
  'aws_region',
  'sentry_dsn',
  'namepicker_sheet_id',
  'gcp_oauth_client_id',
  'gcp_oauth_refresh_token',
  'gcp_oauth_client_secret',
  'cdn_host',
  'api_host',
  'mongodb_url',
  'mongodb_database',
  'mongodb_password',
  'jwt_secret',
] as const;

export type StaticEnvKey = typeof staticEnvKeys[number];

export type RequireLoader<T extends string> = (...args: T[]) => void;

export const staticEnv = new Proxy(
  {},
  {
    get(target: Record<string, string>, key: string) {
      if (key === 'require') {
        return (...keys: string[]) => keys.forEach(key => load(key));
      }

      if (key in target) {
        return target[key];
      }
      return load(key);

      function load(key: string) {
        const envKey = key.toUpperCase();
        const value = process.env[envKey];
        if (value == null) {
          throw new EnvNotFoundError({ key, envKey });
        }
        target[key] = value;
        return value;
      }
    },
  }
) as Record<StaticEnvKey, string> & { require: RequireLoader<StaticEnvKey> };
