import { transporter } from '../config/transporter';
import { User } from '@prisma/client';
import { monthlySummaryTemplate } from '../email_Template/monthlySummary';
import { transactionReminderTemplate } from '../email_Template/transactionReminder';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  // attachments?: { filename: string; path: string }[]; // futuro suporte
}

export class MailService {
  async sendEmail({ to, subject, html }: SendEmailParams): Promise<void> {
    await transporter.sendMail({
      from: '"Gestor Financeiro" <no-reply@sistemafinan.com>',
      to,
      subject,
      html,
      // attachments // ← descomentar no futuro
    });
  }

  async sendMonthlySummary(user: User, incomeTotal: number, expenseTotal: number): Promise<void> {
    const saldo = incomeTotal - expenseTotal;

    await this.sendEmail({
    to: user.email,
    subject: 'Seu resumo financeiro mensal',
    html: monthlySummaryTemplate(user.name, incomeTotal, expenseTotal, saldo)
    });
  }

  async sendTransactionReminder(user: User, description: string, date: Date, amount: number): Promise<void> {
    await this.sendEmail({
    to: user.email,
    subject: 'Lembrete de Transação Agendada',
    html: transactionReminderTemplate(user.name, description, date, amount)
    });
  }
}