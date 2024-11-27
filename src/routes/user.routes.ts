import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { createUserValidator, loginValidator } from '../validators/user.validator';
import { validateRequest } from '../middlewares/validator.middleware';

const router = Router();
const userController = new UserController();

router.post(
  '/users',
  createUserValidator,
  validateRequest,
  userController.createUser.bind(userController)
);

router.post(
  '/login',
  loginValidator,
  validateRequest,
  userController.login.bind(userController)
);

router.get(
  '/me', 
  authenticate, 
  userController.getProfile.bind(userController)
);

router.put(
  '/me',
  authenticate,
  userController.updateUser.bind(userController)
);

router.delete(
  '/me',
  authenticate,
  userController.deleteUser.bind(userController)
);

export default router;