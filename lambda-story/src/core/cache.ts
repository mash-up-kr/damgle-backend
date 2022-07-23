import { CACHE_MANAGER, CacheModule, Inject, Module } from '@nestjs/common';
import { Cache } from 'cache-manager';

let cache: Cache;

@Module({
  imports: [CacheModule.register({ isGlobal: true })],
})
export class CacheableModule {
  constructor(@Inject(CACHE_MANAGER) cacheManager: Cache) {
    cache = cacheManager;
  }
}

export const Cacheable = (ttl: number) => (_: any, __: string, descriptor: PropertyDescriptor) => {
  const originalFn = descriptor.value;
  const createCacheKey = (args: any[]) => `${originalFn.name}_${args.join('_')}`;
  descriptor.value = async function (...args: any[]) {
    const key = createCacheKey(args);
    const cached = await cache.get(key);
    if (cached) {
      return cached;
    } else {
      return await originalFn.apply(this, args).then((result: unknown) => {
        cache.set(key, result, { ttl });
        return result;
      });
    }
  };
};
