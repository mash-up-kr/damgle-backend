import { EnvNotFoundError } from '@damgle/errors';

export function ensuredEnv<T extends Record<string, string>>(
  keymap: T,
  defaults?: Partial<T>
): { [key in keyof T]: string } {
  for (const [key, envKey] of Object.entries(keymap)) {
    const value = process.env[envKey];

    (keymap as any)[key] = value || defaults?.[key];

    if (typeof keymap[key] !== 'string') {
      throw new EnvNotFoundError({
        key,
        envKey,
      });
    }
  }
  return keymap;
}
