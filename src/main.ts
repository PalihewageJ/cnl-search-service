import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useLogger(app.get(Logger));
  const config = app.get(ConfigService);
  const logger = app.get(Logger);
  const port = config.get('service.port');
  await app.listen(port, () => {
    logger.log(`server started at port ${port}`);
  });
}
bootstrap();
