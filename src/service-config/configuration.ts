import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';

import configValidationSchema from './configuration.schema';

async function fetchConfig() {
  const http = new HttpService();
  const logger = new Logger();
  const headers = {
    source: 'service',
  };

  const configurationUrl = `${process.env.CONFIGURATION_BASE_URL}/${process.env.SERVICE_NAME}/${process.env.STAGE}`;
  const responseRaw = http.get(configurationUrl, { headers });
  logger.log(`fetching configurations from ${configurationUrl}`);
  const respose = await firstValueFrom(responseRaw);
  const configData = respose.data;
  await configValidationSchema.validateAsync(configData).catch((err) => {
    logger.error(err);
    throw new Error(err);
  });
  logger.log(
    `configuration data validated from ${configData.service.serviceName}|${configData.service.stage}|${configData.service.id}`,
  );
  return configData;
}
export default fetchConfig;
