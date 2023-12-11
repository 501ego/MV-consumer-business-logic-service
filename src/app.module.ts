import { Module } from '@nestjs/common'
import { APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ResponseInterceptor } from './commons/interceptors/response.interceptor'
import { RpcLoggerInterceptor } from './commons/interceptors/logger.interceptor'
import { RpcExceptionFilter } from './commons/filters/rpc-exception.filter'
import { RabbitMQModule } from './modules/publisher/rabbit.module'

@Module({
  imports: [RabbitMQModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcLoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: RpcExceptionFilter,
    },
  ],
})
export class AppModule {}
