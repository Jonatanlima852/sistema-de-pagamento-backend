import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

interface CreateCategoryData {
  name: string;
  type: 'INCOME' | 'EXPENSE';
  userId: number;
}

interface UpdateCategoryData {
  name?: string;
  type?: 'INCOME' | 'EXPENSE';
}

export class CategoriesService {
  async createCategory(data: CreateCategoryData) {
    const category = await prisma.category.create({
      data,
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return category;
  }

  async getCategories(userId: number) {
    const categories = await prisma.category.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return categories;
  }

  async updateCategory(id: number, userId: number, data: UpdateCategoryData) {
    const category = await prisma.category.updateMany({
      where: { id, userId },
      data,
    });

    if (category.count === 0) {
      throw new AppError('Categoria não encontrada', 404);
    }

    return category;
  }

  async deleteCategory(id: number, userId: number) {
    const category = await prisma.category.deleteMany({
      where: { id, userId },
    });

    if (category.count === 0) {
      throw new AppError('Categoria não encontrada', 404);
    }
  }
}