import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

interface CreateTagData {
  name: string;
  userId: number;
}

interface UpdateTagData {
  name?: string;
}

export class TagsService {
  async createTag(data: CreateTagData) {
    try {
      const tag = await prisma.tag.create({
        data,
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
  
      return tag;
    } catch (error: any) {
      // Tratando erro de unique constraint (nome+userId)
      if (error.code === 'P2002') {
        throw new AppError('Tag com este nome já existe', 400);
      }
      throw error;
    }
  }

  async getTags(userId: number) {
    const tags = await prisma.tag.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return tags;
  }

  async getTag(id: number, userId: number) {
    const tag = await prisma.tag.findFirst({
      where: { id, userId },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!tag) {
      throw new AppError('Tag não encontrada', 404);
    }

    return tag;
  }

  async updateTag(id: number, userId: number, data: UpdateTagData) {
    // Primeiro verifica se a tag existe e pertence ao usuário
    const existingTag = await prisma.tag.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTag) {
      throw new AppError('Tag não encontrada', 404);
    }

    try {
      const tag = await prisma.tag.updateMany({
        where: { 
          id,
          userId
        },
        data,
      });
  
      const updatedTag = await prisma.tag.findFirst({
        where: { id },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
  
      return updatedTag;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new AppError('Tag com este nome já existe', 400);
      }
      throw error;
    }
  }

  async deleteTag(id: number, userId: number) {
    // Primeiro verifica se a tag existe e pertence ao usuário
    const existingTag = await prisma.tag.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTag) {
      throw new AppError('Tag não encontrada', 404);
    }

    try {
      await prisma.tag.deleteMany({
        where: { 
          id,
          userId
        },
      });
    } catch (error: any) {
      throw error;
    }
  }

  async getTransactionsByTag(tagId: number, userId: number) {
    // Primeiro verificar se a tag existe e pertence ao usuário
    const tag = await prisma.tag.findFirst({
      where: { id: tagId, userId },
    });

    if (!tag) {
      throw new AppError('Tag não encontrada', 404);
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        tags: {
          some: {
            tagId,
          },
        },
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
                name: true,
              },
            },
          },
        },
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
} 