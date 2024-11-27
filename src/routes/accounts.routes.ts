import { Router } from 'express';
import { AccountController } from '../controllers/accounts.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { createAccountValidator, updateAccountValidator } from '../validators/account.validator';
import { validateRequest } from '../middlewares/validator.middleware';

const router = Router();
const accountController = new AccountController();

// Todas as rotas de contas precisam de autenticação
router.use(authenticate); // Middleware de autenticação - confere se o usuário está autenticado e adiciona o usuário no request

router.post(
  '/accounts',
  createAccountValidator,
  validateRequest,
  accountController.createAccount.bind(accountController)
);

router.get(
  '/accounts',
  accountController.getAccounts.bind(accountController)
);

router.get(
  '/accounts/:id',
  accountController.getAccount.bind(accountController)
);

router.put(
  '/accounts/:id',
  updateAccountValidator,
  validateRequest,
  accountController.updateAccount.bind(accountController)
);

router.delete(
  '/accounts/:id',
  accountController.deleteAccount.bind(accountController)
);

export default router;
