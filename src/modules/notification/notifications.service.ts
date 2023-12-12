import { Injectable } from '@nestjs/common'
import { EmailService } from '../email-sender/email.service'
import { RpcException } from '@nestjs/microservices'

@Injectable()
export class NotificationsService {
  constructor(private emailService: EmailService) {}

  async create(data: any) {
    if (!data.loan || !data.loan.client || !data.loan.client.email) {
      throw new RpcException(
        'Información del préstamo o cliente no proporcionada',
      )
    }
    const loanDetails = data.loan

    const emailBody =
      `Hola ${loanDetails.client.name},\n\n` +
      `Tu solicitud de préstamo ha sido recibida y está en proceso de aprobación.\n` +
      `Detalles del Préstamo:\n` +
      ` - Monto: ${loanDetails.amount}\n` +
      ` - Interés: ${loanDetails.interest}%\n` +
      ` - Total a Pagar: ${loanDetails.total}\n` +
      ` - Fecha: ${new Date(loanDetails.date).toLocaleDateString()}\n` +
      ` - Estado: ${loanDetails.status}\n\n` +
      `Gracias por confiar en nosotros.`

    const emailHtml =
      `<p>Hola <strong>${loanDetails.client.name}</strong>,</p>` +
      `<p>Tu solicitud de préstamo ha sido recibida y está en proceso de aprobación.</p>` +
      `<p><strong>Detalles del Préstamo:</strong></p>` +
      `<ul>` +
      `<li>Monto: ${loanDetails.amount}</li>` +
      `<li>Interés: ${loanDetails.interest}%</li>` +
      `<li>Total a Pagar: ${loanDetails.total}</li>` +
      `<li>Fecha: ${new Date(loanDetails.date).toLocaleDateString()}</li>` +
      `<li>Estado: ${loanDetails.status}</li>` +
      `</ul>` +
      `<p>Gracias por confiar en nosotros.</p>`

    try {
      await this.emailService.sendMail(
        loanDetails.client.email,
        'Solicitud de préstamo en proceso de aprobación',
        emailBody,
        emailHtml,
      )
    } catch (error) {
      throw new RpcException(error.message)
    }
  }

  async payLoan(data: any) {
    console.log('Loan paid')
  }
}
