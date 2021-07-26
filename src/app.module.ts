import { Module } from '@nestjs/common';
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
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
