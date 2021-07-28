import { RedisModule } from '@nestjs-modules/ioredis';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import CacheService from './cache.service';
import HttpClientService from './http-client.service';

@Module({
  imports: [
    HttpModule,
    RedisModule.forRoot({
      config: {
        url: 'redis://localhost:6379',
      },
    }),
  ],
  providers: [CacheService, HttpClientService],
  exports: [HttpClientService],
})
export default class UtilModule {}
