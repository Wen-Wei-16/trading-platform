import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export interface JWTPayload {
  userId: string;
  email: string;
  isTwoFactorEnabled: boolean;
}

export const generateToken = (user: User): string => {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    isTwoFactorEnabled: user.isTwoFactorEnabled
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JWTPayload;
};

export const generateTwoFactorToken = (secret: string): string => {
  return jwt.sign({ secret }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '5m'
  });
}; 