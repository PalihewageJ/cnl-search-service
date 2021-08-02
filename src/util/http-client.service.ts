import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import CacheService from './cache.service';

@Injectable()
export default class HttpClientService {
  constructor(
    private _http: HttpService,
    private _cacheService: CacheService,
    @InjectPinoLogger() private _logger: PinoLogger,
  ) {}

  async get(url: string, cachettl?: number) {
    if (!cachettl) {
      const apiAttendeesObs = this._http.get(url);
      const apiResponse = (await firstValueFrom(apiAttendeesObs)).data;
      return apiResponse;
    }
    let response = JSON.parse(await this._cacheService.readFromCache(url));
    if (!response) {
      this._logger.debug(`cache missed for ${url}`);
      const attendeesObs = this._http.get(url);
      response = (await firstValueFrom(attendeesObs)).data;
      await this._cacheService.addStringToCache(
        url,
        JSON.stringify(response),
        cachettl,
      );
      this._logger.debug(`cache updated for ${url}`);
    } else {
      this._logger.debug(`cache found for ${url}`);
    }
    return response;
  }
}
