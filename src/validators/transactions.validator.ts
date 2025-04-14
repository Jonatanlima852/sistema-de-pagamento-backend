import { body } from 'express-validator';

export const createTransactionValidator = [
  body('description')
    .notEmpty()
    .withMessage('A descrição é obrigatória'),
  body('amount')
    .isNumeric()
    .withMessage('O valor é obrigatório e deve ser numérico'),
  body('date')
    .isISO8601()
    .withMessage('A data é obrigatória e deve estar no formato ISO 8601'),
  body('type')
    .isIn(['INCOME', 'EXPENSE'])
    .withMessage('O tipo é obrigatório e deve ser INCOME ou EXPENSE'),
  body('isRecurring')
    .isBoolean()
    .withMessage('O campo isRecurring é obrigatório e deve ser booleano'),
  body('categoryId')
    .isInt()
    .withMessage('O ID da categoria é obrigatório e deve ser um número inteiro'),
  body('accountId')
    .isInt()
    .withMessage('O ID da conta é obrigatório e deve ser um número inteiro'),
  body('tagIds')
    .optional()
    .isArray()
    .withMessage('TagIds deve ser um array de IDs')
    .custom((value) => {
      if (!Array.isArray(value)) return true;
      return value.every(item => Number.isInteger(item) && item > 0);
    })
    .withMessage('TagIds deve conter apenas números inteiros positivos'),
];

export const updateTransactionValidator = [
  body('description')
    .optional()
    .notEmpty()
    .withMessage('A descrição não pode ser vazia'),
  body('amount')
    .optional()
    .isNumeric()
    .withMessage('O valor deve ser numérico'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('A data deve estar no formato ISO 8601'),
  body('type')
    .optional()
    .isIn(['INCOME', 'EXPENSE'])
    .withMessage('O tipo deve ser INCOME ou EXPENSE'),
  body('isRecurring')
    .optional()
    .isBoolean()
    .withMessage('O campo isRecurring deve ser booleano'),
  body('categoryId')
    .optional()
    .isInt()
    .withMessage('O ID da categoria deve ser um número inteiro'),
  body('accountId')
    .optional()
    .isInt()
    .withMessage('O ID da conta deve ser um número inteiro'),
  body('tagIds')
    .optional()
    .isArray()
    .withMessage('TagIds deve ser um array de IDs')
    .custom((value) => {
      if (!Array.isArray(value)) return true;
      return value.every(item => Number.isInteger(item) && item > 0);
    })
    .withMessage('TagIds deve conter apenas números inteiros positivos'),
];