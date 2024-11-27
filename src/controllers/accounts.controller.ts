import { Request, Response, NextFunction } from 'express';
import { AccountService } from '../services/accounts.service';

const accountService = new AccountService();

export class AccountController {
  async createAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const account = await accountService.createAccount({
        ...req.body,
        userId: req.user!.id
      });
      console.log(account);
      res.status(201).json(account);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAccounts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accounts = await accountService.getAccounts(req.user!.id);
      res.json(accounts);
    } catch (error) {
      next(error);
    }
  }

  async getAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const account = await accountService.getAccount(
        parseInt(req.params.id),
        req.user!.id
      );
      res.json(account);
    } catch (error) {
      next(error);
    }
  }

  async updateAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const account = await accountService.updateAccount(
        parseInt(req.params.id),
        req.user!.id,
        req.body
      );
      res.json(account);
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await accountService.deleteAccount(
        parseInt(req.params.id),
        req.user!.id
      );
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
} 