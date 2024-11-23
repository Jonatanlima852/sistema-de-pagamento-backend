import { body } from 'express-validator';

export const createAccountValidator = [
  body('name')
    .notEmpty()
    .withMessage('Nome da conta é obrigatório'),
  body('type')
    .isIn(['DEBIT_CARD', 'SAVING', 'CREDIT_CARD', 'CASH', 'INVESTMENT', 'BUSINESS_CARD', 'OTHER'])
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
    .isIn(['DEBIT_CARD', 'SAVING', 'CREDIT_CARD', 'CASH', 'INVESTMENT', 'BUSINESS_CARD', 'OTHER'])
    .withMessage('Tipo de conta inválido'),
  body('balance')
    .optional()
    .isDecimal()
    .withMessage('Saldo deve ser um valor decimal')
]; 