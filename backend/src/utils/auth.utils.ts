import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

export function generateJWT(userId: number): string {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '24h'
  });
}

export function verifyJWT(token: string): { id: number } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number };
  } catch (error) {
    return null;
  }
}