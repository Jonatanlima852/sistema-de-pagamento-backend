import { body } from 'express-validator';

export const createAccountValidator = [
  body('name')
    .notEmpty()
    .withMessage('Nome da conta é obrigatório'),
  body('type')
    .isIn(['CHECKING', 'SAVINGS', 'CREDIT_CARD', 'CASH', 'INVESTMENT'])
    .withMessage('Tipo de conta inválido'),
  body('balance')
    .isDecimal()
    .withMessage('Saldo deve ser um valor decimal')
];

export const updateAccountValidator = [
  body('name')  
    .optional()
    .notEmpty()
    .withMessage('Nome da conta é obrigatório'),
  body('type')
    .optional()
    .isIn(['CHECKING', 'SAVINGS', 'CREDIT_CARD', 'CASH', 'INVESTMENT'])
    .withMessage('Tipo de conta inválido'),
  body('balance')
    .optional()
    .isDecimal()
    .withMessage('Saldo deve ser um valor decimal')
]; 