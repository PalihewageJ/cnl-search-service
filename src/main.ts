import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger();
  const port = config.get('service.port');
  await app.listen(port, () => {
    logger.log(`server started at port ${port}`);
  });
}
bootstrap();
