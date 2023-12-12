import { Controller, Body, UseInterceptors } from '@nestjs/common'
import { EmailService } from './email.service'
import { RabbitMqTraceInterceptor } from '../../commons/interceptors/trace.interceptor'

@UseInterceptors(RabbitMqTraceInterceptor)
@Controller()
export class EmailController {
  constructor(private emailService: EmailService) {}

  async sendEmail(@Body() emailDetails: any) {
    console.log('emailDetails', emailDetails)
    const { to, subject, text, html } = emailDetails
    await this.emailService.sendMail(to, subject, text, html)
    return { message: 'Email sent successfully', data: null }
  }
}
