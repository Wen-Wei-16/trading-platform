import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWTPayload } from '../utils/jwt';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: '未提供認證令牌' });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: payload.userId } });

    if (!user) {
      return res.status(401).json({ error: '用戶不存在' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: '無效的認證令牌' });
  }
};

export const requireTwoFactor = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.isTwoFactorEnabled) {
    return next();
  }

  const twoFactorToken = req.headers['x-2fa-token'];
  if (!twoFactorToken) {
    return res.status(401).json({ error: '需要雙因子認證' });
  }

  try {
    const payload = verifyToken(twoFactorToken as string);
    if (payload.secret !== req.user.twoFactorSecret) {
      return res.status(401).json({ error: '無效的雙因子令牌' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: '無效的雙因子令牌' });
  }
}; 