import { Router } from 'express';
import { TagsController } from '../controllers/tags.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validator.middleware';
import { createTagValidator, updateTagValidator } from '../validators/tag.validator';

const router = Router();
const tagsController = new TagsController();

// Todas as rotas de tags precisam de autenticação
router.use(authenticate);

router.post(
  '/tags',
  createTagValidator,
  validateRequest,
  tagsController.createTag.bind(tagsController)
);

router.get(
  '/tags',
  tagsController.getTags.bind(tagsController)
);

router.get(
  '/tags/:id',
  tagsController.getTag.bind(tagsController)
);

router.put(
  '/tags/:id',
  updateTagValidator,
  validateRequest,
  tagsController.updateTag.bind(tagsController)
);

router.delete(
  '/tags/:id',
  tagsController.deleteTag.bind(tagsController)
);

router.get(
  '/tags/:id/transactions',
  tagsController.getTransactionsByTag.bind(tagsController)
);

export default router; 