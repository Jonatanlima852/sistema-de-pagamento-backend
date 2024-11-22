import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';


const prisma = new PrismaClient();

interface CreateTransactionData {
  description: string;
  amount: number;
  date: Date;
  type: 'INCOME' | 'EXPENSE';
  isRecurring: boolean;
  categoryId: number;
  accountId: number;
  userId: number;
}

interface UpdateTransactionData {
  description?: string;
  amount?: number;
  date?: Date;
  type?: 'INCOME' | 'EXPENSE';
  isRecurring?: boolean;
  categoryId?: number;
  accountId?: number;
}

export class TransactionsService {
  async createTransaction(data: CreateTransactionData) {
    // Verificar se o accountId existe
    const account = await prisma.account.findUnique({
      where: { id: data.accountId },
    });

    if (!account) {
      throw new AppError('Conta não encontrada', 404);
    }

    const transaction = await prisma.transaction.create({
      data,
      select: {
        id: true,
        description: true,
        amount: true,
        date: true,
        type: true,
        isRecurring: true,
        categoryId: true,
        accountId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const newBalance = (data.type === 'INCOME')
        ? Number(account.balance) + data.amount
        : Number(account.balance) - data.amount;

    await prisma.account.update({
        where: { id: data.accountId },
        data: { balance: newBalance },
    });

    return transaction;
  }

  async getTransactions(userId: number) {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      select: {
        id: true,
        description: true,
        amount: true,
        date: true,
        type: true,
        isRecurring: true,
        categoryId: true,
        accountId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return transactions;
  }

  async getTransaction(id: number, userId: number) {
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
      select: {
        id: true,
        description: true,
        amount: true,
        date: true,
        type: true,
        isRecurring: true,
        categoryId: true,
        accountId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!transaction) {
      throw new AppError('Transação não encontrada', 404);
    }

    return transaction;
  }

  async updateTransaction(id: number, userId: number, data: UpdateTransactionData) {
    const transaction = await prisma.transaction.updateMany({
      where: { id, userId },
      data,
    });

    if (transaction.count === 0) {
      throw new AppError('Transação não encontrada', 404);
    }

    return transaction;
  }

  async deleteTransaction(id: number, userId: number) {
    const transaction = await prisma.transaction.deleteMany({
      where: { id, userId },
    });

    if (transaction.count === 0) {
      throw new AppError('Transação não encontrada', 404);
    }
  }

  async getSummary(userId: number, startDate: Date, endDate: Date) {
    const summary = await prisma.transaction.groupBy({
      by: ['type'],
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return summary;
  }
}