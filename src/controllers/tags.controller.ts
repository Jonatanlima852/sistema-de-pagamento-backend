import { Request, Response, NextFunction } from 'express';
import { TagsService } from '../services/tags.service';

const tagsService = new TagsService();

export class TagsController {
  async createTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tag = await tagsService.createTag({
        ...req.body,
        userId: req.user!.id
      });
      res.status(201).json(tag);
    } catch (error) {
      next(error);
    }
  }

  async getTags(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tags = await tagsService.getTags(req.user!.id);
      res.json(tags);
    } catch (error) {
      next(error);
    }
  }

  async getTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tag = await tagsService.getTag(
        parseInt(req.params.id),
        req.user!.id
      );
      res.json(tag);
    } catch (error) {
      next(error);
    }
  }

  async updateTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tag = await tagsService.updateTag(
        parseInt(req.params.id),
        req.user!.id,
        req.body
      );
      res.json(tag);
    } catch (error) {
      next(error);
    }
  }

  async deleteTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await tagsService.deleteTag(
        parseInt(req.params.id),
        req.user!.id
      );
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getTransactionsByTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const transactions = await tagsService.getTransactionsByTag(
        parseInt(req.params.id),
        req.user!.id
      );
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  }
} 