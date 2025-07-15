import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/auth.utils';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ 
      error: 'Acceso no autorizado',
      code: 'MISSING_TOKEN'
    });
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    return res.status(401).json({ 
      error: 'Token inválido o expirado',
      code: 'INVALID_TOKEN'
    });
  }

  (req as any).user = { id: decoded.id };
  next();
};