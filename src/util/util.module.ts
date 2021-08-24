import { RedisModule } from '@nestjs-modules/ioredis';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { M3ClientService } from './m3-client.service';
import ServiceConfigModule from 'src/service-configuration/service-configuration.module';
import CacheService from './cache.service';
import HttpClientService from './http-client.service';

@Module({
  imports: [
    HttpModule,
    RedisModule.forRootAsync({
      imports: [ServiceConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        config: {
          url: config.get('database.redis.url'),
        },
      }),
    }),
  ],
  providers: [CacheService, HttpClientService, M3ClientService],
  exports: [HttpClientService, M3ClientService],
})
export default class UtilModule {}
