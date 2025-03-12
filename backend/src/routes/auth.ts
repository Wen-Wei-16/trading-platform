import { Express } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/auth';
import { authenticate, requireTwoFactor } from '../middleware/auth';
import { logger } from '../utils/logger';

const authService = new AuthService();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6)
});

export const setupAuthRoutes = (app: Express) => {
  const router = app.Router();

  // 註冊
  router.post('/register', async (req, res) => {
    try {
      const data = registerSchema.parse(req.body);
      const user = await authService.register(data.email, data.password, data.name);
      res.json({ message: '註冊成功', userId: user.id });
    } catch (error) {
      logger.error('註冊失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '註冊失敗' });
    }
  });

  // 登入
  router.post('/login', async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      const { user, token } = await authService.login(data.email, data.password);
      res.json({
        message: '登入成功',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          isTwoFactorEnabled: user.isTwoFactorEnabled
        }
      });
    } catch (error) {
      logger.error('登入失敗:', error);
      res.status(401).json({ error: error instanceof Error ? error.message : '登入失敗' });
    }
  });

  // 啟用雙因子認證
  router.post('/2fa/enable', authenticate, async (req, res) => {
    try {
      const { secret, token } = await authService.enableTwoFactor(req.user!.id);
      res.json({ secret, token });
    } catch (error) {
      logger.error('啟用雙因子認證失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '啟用雙因子認證失敗' });
    }
  });

  // 禁用雙因子認證
  router.post('/2fa/disable', authenticate, requireTwoFactor, async (req, res) => {
    try {
      await authService.disableTwoFactor(req.user!.id);
      res.json({ message: '雙因子認證已禁用' });
    } catch (error) {
      logger.error('禁用雙因子認證失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '禁用雙因子認證失敗' });
    }
  });

  // 修改密碼
  router.post('/change-password', authenticate, requireTwoFactor, async (req, res) => {
    try {
      const data = changePasswordSchema.parse(req.body);
      await authService.changePassword(req.user!.id, data.oldPassword, data.newPassword);
      res.json({ message: '密碼修改成功' });
    } catch (error) {
      logger.error('修改密碼失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '修改密碼失敗' });
    }
  });

  app.use('/api/auth', router);
}; 