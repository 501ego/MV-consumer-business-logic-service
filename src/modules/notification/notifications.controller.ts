import { Controller, UseInterceptors } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { MessagePattern } from '@nestjs/microservices'
import { RabbitMqTraceInterceptor } from '../../commons/interceptors/trace.interceptor'

@UseInterceptors(RabbitMqTraceInterceptor)
@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern({ cmd: 'loan-created' })
  async create(data: any) {
    await this.notificationsService.create(data)
    return { message: 'Email sent successfully', data: null }
  }

  @MessagePattern({ cmd: 'loan-paid' })
  async payLoan(data: any) {
    await this.notificationsService.payLoan(data)
  }
}
