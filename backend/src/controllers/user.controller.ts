// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import UserModel from '../models/user.model';
import { generateJWT } from '../utils/auth.utils';
import { RegisterUserDto, LoginUserDto } from '../interfaces/user.interface';

export class AuthController {
  /**
   * Registro de nuevo usuario
   */
  public async register(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, rol } = req.body as RegisterUserDto;

    try {
      // Verificar si el usuario ya existe
      const existingUser = await UserModel.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ 
          error: 'El email ya está registrado',
          code: 'EMAIL_ALREADY_EXISTS'
        });
      }

      const newUser = await UserModel.createUser({
        username,
        email,
        password,
        rol
      });

      const token = generateJWT(newUser.id);

      console.log(token);

      return res.status(201).json({
        success: true,
        user: {
          id: newUser.id,
          user_name: newUser.user_name,
          email: newUser.email,
          rol: newUser.rol,
          active: newUser.active
        },
        token
      });

    } catch (error) {
      console.error('Error en registro:', error);
      return res.status(500).json({ 
        error: 'Error interno del servidor',
        code: 'INTERNAL_SERVER_ERROR'
      });
    }
  }

  /**
   * Inicio de sesión de usuario
   */
  public async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body as LoginUserDto;

    try {
      const isValid = await UserModel.verifyPassword(email, password);
      if (!isValid) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas',
          code: 'INVALID_CREDENTIALS'
        });
      }

      const user = await UserModel.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ 
          error: 'Usuario no encontrado',
          code: 'USER_NOT_FOUND'
        });
      }

      if (!user.active) {
        return res.status(403).json({ 
          error: 'Cuenta desactivada',
          code: 'ACCOUNT_DISABLED'
        });
      }

      const token = generateJWT(user.id);

      return res.json({
        success: true,
        user: {
          id: user.id,
          user_name: user.user_name,
          email: user.email,
          rol: user.rol,
          active: user.active
        },
        token,
        expiresIn: '24h'
      });

    } catch (error) {
      console.error('Error en login:', error);
      return res.status(500).json({ 
        error: 'Error interno del servidor',
        code: 'INTERNAL_SERVER_ERROR'
      });
    }
  }

  /**
   * Obtener información del usuario actual
   */
  public async getCurrentUser(req: Request, res: Response) {
    try {
      // El middleware de autenticación debería añadir user.id al request
      const userId = (req as any).user?.id;
      if (!userId) {
        return res.status(401).json({ 
          error: 'No autorizado',
          code: 'UNAUTHORIZED'
        });
      }

      const user = await UserModel.getUserById(userId);
      if (!user) {
        return res.status(404).json({ 
          error: 'Usuario no encontrado',
          code: 'USER_NOT_FOUND'
        });
      }

      return res.json({
        success: true,
        user: {
          id: user.id,
          user_name: user.user_name,
          email: user.email,
          rol: user.rol
        }
      });

    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return res.status(500).json({ 
        error: 'Error interno del servidor',
        code: 'INTERNAL_SERVER_ERROR'
      });
    }
  }
}

export default new AuthController();