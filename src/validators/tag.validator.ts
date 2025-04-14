import { body } from 'express-validator';

export const createTagValidator = [
  body('name')
    .notEmpty()
    .withMessage('O nome da tag é obrigatório')
    .isLength({ min: 2, max: 30 })
    .withMessage('O nome da tag deve ter entre 2 e 30 caracteres'),
];

export const updateTagValidator = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('O nome da tag não pode ser vazio')
    .isLength({ min: 2, max: 30 })
    .withMessage('O nome da tag deve ter entre 2 e 30 caracteres'),
]; 