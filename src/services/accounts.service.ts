import { PrismaClient, AccountType } from '@prisma/client';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

interface CreateAccountData {
  name: string;
  type: AccountType;
  balance: number;
  userId: number;
}

interface UpdateAccountData {
  name?: string;
  type?: AccountType;
  balance?: number;
}

export class AccountService {
  async createAccount(data: CreateAccountData) {
    const account = await prisma.account.create({
      data: {
        name: data.name,
        type: data.type,
        balance: data.balance,
        userId: data.userId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        balance: true,
        createdAt: true,
      },
    });

    return account;
  }

  async getAccounts(userId: number) {
    const accounts = await prisma.account.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        balance: true,
        createdAt: true,
      },
    });

    return accounts;
  }

  async getAccount(accountId: number, userId: number) {
    const account = await prisma.account.findFirst({
      where: {
        id: accountId,
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        balance: true,
        createdAt: true,
      },
    });

    if (!account) {
      throw new AppError('Conta não encontrada', 404);
    }

    return account;
  }

  async updateAccount(accountId: number, userId: number, data: UpdateAccountData) {
    // Primeiro verifica se a conta existe e pertence ao usuário
    const existingAccount = await prisma.account.findFirst({
      where: {
        id: accountId,
        userId: userId,
      },
    });

    if (!existingAccount) {
      throw new AppError('Conta não encontrada', 404);
    }

    const account = await prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        name: data.name,
        type: data.type,
        balance: data.balance,
      },
      select: {
        id: true,
        name: true,
        type: true,
        balance: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return account;
  }

  async deleteAccount(accountId: number, userId: number) {
    // Primeiro verifica se a conta existe e pertence ao usuário
    const existingAccount = await prisma.account.findFirst({
      where: {
        id: accountId,
        userId: userId,
      },
    });

    if (!existingAccount) {
      throw new AppError('Conta não encontrada', 404);
    }

    // Verifica se existem transações vinculadas
    const hasTransactions = await prisma.transaction.findFirst({
      where: {
        accountId: accountId,
      },
    });

    if (hasTransactions) {
      throw new AppError('Não é possível excluir uma conta com transações', 400);
    }

    await prisma.account.delete({
      where: {
        id: accountId,
      },
    });
  }
} 