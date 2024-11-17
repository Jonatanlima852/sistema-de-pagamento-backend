import { body } from 'express-validator';

export const createUserValidator = [
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('A senha deve ter no mínimo 6 caracteres')
    .matches(/\d/)
    .withMessage('A senha deve conter pelo menos um número')
    .matches(/[A-Z]/)
    .withMessage('A senha deve conter pelo menos uma letra maiúscula'),
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('O nome deve ter no mínimo 2 caracteres'),
];

export const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Senha é obrigatória'),
]; 