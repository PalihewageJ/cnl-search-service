import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forRootAsync({
      imports: [ServiceConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('database.pg.hostname'),
          port: config.get('database.pg.port'),
          username: config.get('database.pg.username'),
          password: config.get('database.pg.password'),
          database: config.get('database.pg.database'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
