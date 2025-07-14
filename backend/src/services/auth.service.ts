// src/services/auth.service.ts
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro';

export const verifyToken = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  
  console.log(101010, authHeader);
  if (!authHeader) {
    return res.status(401).json({ 
      success: false,
      message: 'Token no proporcionado' 
    });
  }

  const token = authHeader.split(' ')[1]; // Extrae el token de "Bearer <token>"

  try {
    // Verifica el token y obtiene el payload decodificado
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    console.log(1111111111, decoded, token, )
    
    // Aquí podrías verificar adicionalmente en la base de datos
    // si el usuario sigue existiendo/activo
    
    return res.status(200).json({ 
      success: true,
      user: { id: decoded.userId },
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