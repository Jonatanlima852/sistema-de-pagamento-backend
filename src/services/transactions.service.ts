import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

interface CreateTransactionData {
  description: string;
  amount: number;
  date: Date;
  type: 'INCOME' | 'EXPENSE';
  isRecurring: boolean;
  notify?: boolean;
  categoryId: number;
  accountId: number;
  userId: number;
  tagIds?: number[];
}

interface UpdateTransactionData {
  description?: string;
  amount?: number;
  date?: Date;
  type?: 'INCOME' | 'EXPENSE';
  isRecurring?: boolean;
  notify?: boolean;
  categoryId?: number;
  accountId?: number;
  tagIds?: number[];
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

    // Extrair tagIds da data
    const { tagIds, ...transactionData } = data;

    // Verificar se as tags existem e pertencem ao usuário
    if (tagIds && tagIds.length > 0) {
      const tags = await prisma.tag.findMany({
        where: { 
          id: { in: tagIds },
          userId: data.userId 
        }
      });

      if (tags.length !== tagIds.length) {
        throw new AppError('Uma ou mais tags não foram encontradas', 404);
      }
    }

    // Criar a transação com as conexões de tags
    const transaction = await prisma.transaction.create({
      data: {
        ...transactionData,
        tags: tagIds && tagIds.length > 0 
          ? {
              create: tagIds.map(tagId => ({
                tag: { connect: { id: tagId } }
              }))
            }
          : undefined
      },
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
        tags: {
          select: {
            tag: {
              select: {
                id: true, 
                name: true
              }
            }
          }
        }
      },
    });

    const newBalance = (data.type === 'INCOME')
        ? Number(account.balance) + data.amount
        : Number(account.balance) - data.amount;

    await prisma.account.update({
        where: { id: data.accountId },
        data: { balance: newBalance },
    });

    // Transformando o resultado para um formato mais limpo
    return {
      ...transaction,
      tags: transaction.tags.map(tagRelation => ({
        id: tagRelation.tag.id,
        name: tagRelation.tag.name,
      })),
    };
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
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
    });

    // Transformando o resultado para um formato mais limpo
    return transactions.map(t => ({
      ...t,
      tags: t.tags.map(tagRelation => ({
        id: tagRelation.tag.id,
        name: tagRelation.tag.name,
      })),
    }));
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
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
    });

    if (!transaction) {
      throw new AppError('Transação não encontrada', 404);
    }

    // Transformando o resultado para um formato mais limpo
    return {
      ...transaction,
      tags: transaction.tags.map(tagRelation => ({
        id: tagRelation.tag.id,
        name: tagRelation.tag.name,
      })),
    };
  }

  async updateTransaction(id: number, userId: number, data: UpdateTransactionData) {
    // Extrair tagIds da data
    const { tagIds, ...transactionData } = data;

    // Verificar se as tags existem e pertencem ao usuário
    if (tagIds && tagIds.length > 0) {
      const tags = await prisma.tag.findMany({
        where: { 
          id: { in: tagIds },
          userId 
        }
      });

      if (tags.length !== tagIds.length) {
        throw new AppError('Uma ou mais tags não foram encontradas', 404);
      }
    }

    // Primeiro verificar se a transação existe
    const existingTransaction = await prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!existingTransaction) {
      throw new AppError('Transação não encontrada', 404);
    }

    // Atualizar a transação
    const transaction = await prisma.$transaction(async (prisma) => {
      // Se tagIds for fornecido, atualizar as relações de tags
      if (tagIds !== undefined) {
        // Primeiro, remover todas as tags existentes
        await prisma.tagsOnTransactions.deleteMany({
          where: { transactionId: id }
        });

        // Então, adicionar as novas tags
        if (tagIds.length > 0) {
          await Promise.all(
            tagIds.map(tagId => 
              prisma.tagsOnTransactions.create({
                data: {
                  transactionId: id,
                  tagId
                }
              })
            )
          );
        }
      }

      // Atualizar os dados da transação
      return prisma.transaction.update({
        where: { id },
        data: transactionData,
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
          tags: {
            select: {
              tag: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        },
      });
    });
    
    // Transformando o resultado para um formato mais limpo
    return {
      ...transaction,
      tags: transaction.tags.map(tagRelation => ({
        id: tagRelation.tag.id,
        name: tagRelation.tag.name,
      })),
    };
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