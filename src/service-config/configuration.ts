import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';

import configValidationSchema from './configuration.schema';

async function fetchConfig() {
  const http = new HttpService();
  const logger = new Logger();

  const response = http.get(
    `${process.env.CONFIG_BASE_URL}?serviceName=${process.env.SERVICE_NAME}`,
  );
  const resp = await firstValueFrom(response);
  const configData = resp.data;
  await configValidationSchema.validateAsync(configData).catch((err) => {
    logger.error(err);
    throw new Error(err);
  });
  console.log(configData);
  return configData;
}
export default fetchConfig;
