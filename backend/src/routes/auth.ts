import express from 'express';
import { body } from 'express-validator';
import AuthController from '../controllers/user.controller';
import { verifyToken } from '../services/auth.service';

const router = express.Router();

router.post('/register', 
  [
    body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol').optional().isString()
  ],
  AuthController.register
);

router.post('/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida')
  ],
  AuthController.login
);

router.post('/verify', verifyToken);

router.get('/me', AuthController.getCurrentUser);

export default router;