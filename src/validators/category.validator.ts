import { body } from 'express-validator';

export const createCategoryValidator = [
  body('name')
    .notEmpty()
    .withMessage('O nome da categoria é obrigatório'),
  body('type')
    .isIn(['INCOME', 'EXPENSE'])
    .withMessage('O tipo da categoria é obrigatório e deve ser INCOME ou EXPENSE'),
];

export const updateCategoryValidator = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('O nome da categoria não pode ser vazio'),
  body('type')
    .optional()
    .isIn(['INCOME', 'EXPENSE'])
    .withMessage('O tipo da categoria deve ser INCOME ou EXPENSE'),
];