import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import EmployeeModule from './employee/employee.module';
import AuthModule from './auth/auth.module';
import ServiceConfigModule from './service-config/service-config.module';
import NotificationModule from './notification/notification.module';

@Module({
  imports: [
    EmployeeModule,
    AuthModule,
    ServiceConfigModule,
    NotificationModule,
    LoggerModule.forRootAsync({
      imports: [ServiceConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          pinoHttp: config.get('logger.pinoHttp'),
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
