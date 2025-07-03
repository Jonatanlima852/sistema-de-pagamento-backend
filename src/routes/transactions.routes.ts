import { Router } from 'express';
import { TransactionsController } from '../controllers/transactions.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validator.middleware';
import { createTransactionValidator, updateTransactionValidator } from '../validators/transactions.validator';

const router = Router();
const transactionsController = new TransactionsController();

// Todas as rotas de transações precisam de autenticação
router.use(authenticate);

router.post(
  '/transactions',
  createTransactionValidator,
  validateRequest,
  transactionsController.createTransaction.bind(transactionsController)
);

router.get(
  '/transactions',
  transactionsController.getTransactions.bind(transactionsController)
);

router.get(
  '/transactions/:id',
  transactionsController.getTransaction.bind(transactionsController)
);

router.put(
  '/transactions/:id',
  updateTransactionValidator,
  validateRequest,
  transactionsController.updateTransaction.bind(transactionsController)
);

router.delete(
  '/transactions/:id',
  transactionsController.deleteTransaction.bind(transactionsController)
);

router.get(
  '/transactions/summary',
  transactionsController.getSummary.bind(transactionsController)
);

router.post(
  '/export', 
  transactionsController.exportTransactionsReport.bind(transactionsController)
);

export default router;