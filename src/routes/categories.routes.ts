import { Router } from 'express';
import { CategoriesController } from '../controllers/categories.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validator.middleware';
import { createCategoryValidator, updateCategoryValidator } from '../validators/category.validator';

const router = Router();
const categoriesController = new CategoriesController();

// Todas as rotas de categorias precisam de autenticação
router.use(authenticate);

router.post(
  '/categories',
  createCategoryValidator,
  validateRequest,
  categoriesController.createCategory.bind(categoriesController)
);

router.get(
  '/categories',
  categoriesController.getCategories.bind(categoriesController)
);

router.put(
  '/categories/:id',
  updateCategoryValidator,
  validateRequest,
  categoriesController.updateCategory.bind(categoriesController)
);

router.delete(
  '/categories/:id',
  categoriesController.deleteCategory.bind(categoriesController)
);

export default router;