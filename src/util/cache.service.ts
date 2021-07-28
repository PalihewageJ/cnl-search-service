import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CacheService {
  constructor(@InjectRedis() private _redis: Redis) {}

  async addStringToCache(key: string, data: string, ttl: number) {
    if (ttl) {
      await this._redis.set(key, data, 'EX', ttl);
    } else {
      await this._redis.set(key, data);
    }
  }

  async readFromCache(key: string) {
    const cachedResponse = await this._redis.get(key);
    return cachedResponse;
  }
}
