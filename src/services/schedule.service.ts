import cron from 'node-cron';
import { subMonths, startOfMonth, endOfMonth, isToday } from 'date-fns';
import { prisma } from '../prisma';
import { MailService } from './mail.service';

const mailService = new MailService();

// Envio do resumo mensal no dia 1 de cada mês às 07:00
cron.schedule('0 7 1 * *', async () => {
  console.log('[Cron] Enviando resumo mensal de todos os usuários...');
  const users = await prisma.user.findMany();
  const start = startOfMonth(subMonths(new Date(), 1));
  const end = endOfMonth(subMonths(new Date(), 1));

  for (const user of users) {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    const incomeTotal = transactions
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expenseTotal = transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    if (incomeTotal > 0 || expenseTotal > 0) {
      await mailService.sendMonthlySummary(user, incomeTotal, expenseTotal);
    }
  }
});

// Envio de lembretes de transações no dia do evento às 08:00
cron.schedule('0 8 * * *', async () => {
  console.log('[Cron] Verificando transações com notificação marcada...');
  const today = new Date();
  const transactions = await prisma.transaction.findMany({
    where: {
      notify: true,
    },
    include: {
      user: true,
    },
  });

  for (const txn of transactions) {
    if (isToday(txn.date)) {
      await mailService.sendTransactionReminder(txn.user, txn.description, txn.date, Number(txn.amount));
    }
  }
});