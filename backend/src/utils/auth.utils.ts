import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

interface JwtPayload {
  id: string;
  email: string;
}

export function generateJWT(user: { id: string; email: string }): string {
  return jwt.sign(
    { id: user.id.toString(), email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyJWT(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}