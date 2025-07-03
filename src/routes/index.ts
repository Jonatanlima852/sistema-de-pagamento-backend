import { Router } from 'express';
import userRoutes from './user.routes';
import transactionsRoutes from './transactions.routes';
import categoriesRoutes from './categories.routes';
import accountsRoutes from './accounts.routes';
import tagsRoutes from './tags.routes';

const router = Router();

// Combinar todas as rotas
router.use(userRoutes);
router.use(transactionsRoutes);
router.use(categoriesRoutes);
router.use(accountsRoutes);
router.use(tagsRoutes);

export default router; 