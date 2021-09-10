import { Controller, Get } from '@nestjs/common';

@Controller('ping')
export class PingController {
  @Get()
  ping() {
    return {
      message: 'You have successfully reached openfaas hosted service',
    };
  }
}
