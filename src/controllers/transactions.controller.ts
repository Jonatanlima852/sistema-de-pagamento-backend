import { Request, Response, NextFunction } from 'express';
import { TransactionsService } from '../services/transactions.service';
import { MailService } from '../services/mail.service';
import { prisma } from '../prisma';
import { AppError } from '../utils/AppError';

const transactionsService = new TransactionsService();

export class TransactionsController {
  async createTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { notify, ...rest } = req.body;

      const transaction = await transactionsService.createTransaction({
        ...rest,
        notify: notify ?? false,
        userId: req.user!.id
      });

      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  }

  async getTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const transactions = await transactionsService.getTransactions(req.user!.id);
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  }

  async getTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const transaction = await transactionsService.getTransaction(
        parseInt(req.params.id),
        req.user!.id
      );
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }

  async updateTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { notify, ...rest } = req.body;

      const transaction = await transactionsService.updateTransaction(
        parseInt(req.params.id),
        req.user!.id,
        {
          ...rest,
          notify: notify ?? false
        }
      );
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }

  async deleteTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await transactionsService.deleteTransaction(
        parseInt(req.params.id),
        req.user!.id
      );
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { startDate, endDate } = req.query;
      const summary = await transactionsService.getSummary(
        req.user!.id,
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.json(summary);
    } catch (error) {
      next(error);
    }
  }

  async exportTransactionsReport(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const { startDate, endDate } = req.query;

      const transactions = await transactionsService.getTransactions(
        userId,
        startDate as string,
        endDate as string
      );

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new AppError('User not found', 404);

      const incomeTotal = transactions
        .filter(t => t.type === 'INCOME')
        .reduce((acc, t) => acc + Number(t.amount), 0);

      const expenseTotal = transactions
        .filter(t => t.type === 'EXPENSE')
        .reduce((acc, t) => acc + Number(t.amount), 0);

      const mailService = new MailService();
      await mailService.sendMonthlySummary(user, incomeTotal, expenseTotal);

      res.json({ message: 'Relatório enviado com sucesso!' });
    } catch (error) {
      next(error);
    }
  }
}