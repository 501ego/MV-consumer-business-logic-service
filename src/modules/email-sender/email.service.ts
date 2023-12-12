import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { RpcException } from '@nestjs/microservices'
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }

  async sendMail(to: string, subject: string, text: string, html: string) {
    console.log('Sending email...')
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'diego.emailsende',
        subject: subject,
        text: text,
        html: html,
      }
      await this.transporter.sendMail(mailOptions)
    } catch (error) {
      throw new RpcException(`Error sending email: ${error.message}`)
    }
  }
}
