// src/services/auth.service.ts
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import userModel from '../models/user.model';
import { verifyJWT } from '../utils/auth.utils';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro';

export const verifyToken = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Token no proporcionado' 
    });
  }

  try {
    const decoded = verifyJWT(token); // Usa la función verifyJWT que ya tienes
    if (!decoded) {
      return res.status(401).json({ 
        success: false,
        message: 'Token inválido' 
      });
    }

    // Verifica el usuario en la base de datos (opcional pero recomendado)
    const user = await userModel.getUserById(Number(decoded.id));
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'Usuario no encontrado',
        code: 'USER_NOT_FOUND'
      });
    }

    // Devuelve los datos del usuario (sin necesidad de consultar email nuevamente)
    return res.status(200).json({ 
      success: true,
      user: { 
        id: decoded.id, 
        email: decoded.email  // <- Email ya viene del JWT
      },
      isValid: true
    });

  } catch (error) {
    console.error('Error al verificar token:', error);
    
    const response: { success: boolean; message: string; code?: string } = {
      success: false,
      message: 'Token inválido'
    };

    if (error instanceof jwt.TokenExpiredError) {
      response.message = 'Token expirado';
      response.code = 'TOKEN_EXPIRED';
    } else if (error instanceof jwt.JsonWebTokenError) {
      response.message = 'Token inválido';
      response.code = 'INVALID_TOKEN';
    }

    return res.status(401).json(response);
  }
};