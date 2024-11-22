import { Request, Response, NextFunction } from 'express';
import { CategoriesService } from '../services/categories.service';

const categoriesService = new CategoriesService();

export class CategoriesController {
  async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = await categoriesService.createCategory({
        ...req.body,
        userId: req.user!.id
      });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await categoriesService.getCategories(req.user!.id);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = await categoriesService.updateCategory(
        parseInt(req.params.id),
        req.user!.id,
        req.body
      );
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await categoriesService.deleteCategory(
        parseInt(req.params.id),
        req.user!.id
      );
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}