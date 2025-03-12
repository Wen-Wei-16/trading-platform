import { Express } from 'express';
import { z } from 'zod';
import { StrategyService } from '../services/strategy';
import { authenticate, requireTwoFactor } from '../middleware/auth';
import { logger } from '../utils/logger';

const strategyService = new StrategyService();

const createStrategySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  code: z.string().min(1),
  parameters: z.record(z.any())
});

const updateStrategySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  code: z.string().min(1).optional(),
  parameters: z.record(z.any()).optional(),
  isActive: z.boolean().optional()
});

export const setupStrategyRoutes = (app: Express) => {
  const router = app.Router();

  // 創建策略
  router.post('/', authenticate, requireTwoFactor, async (req, res) => {
    try {
      const data = createStrategySchema.parse(req.body);
      const strategy = await strategyService.createStrategy(
        req.user!.id,
        data.name,
        data.description || '',
        data.code,
        data.parameters
      );
      res.json(strategy);
    } catch (error) {
      logger.error('創建策略失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '創建策略失敗' });
    }
  });

  // 更新策略
  router.put('/:id', authenticate, requireTwoFactor, async (req, res) => {
    try {
      const data = updateStrategySchema.parse(req.body);
      const strategy = await strategyService.updateStrategy(
        req.params.id,
        req.user!.id,
        data
      );
      res.json(strategy);
    } catch (error) {
      logger.error('更新策略失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '更新策略失敗' });
    }
  });

  // 刪除策略
  router.delete('/:id', authenticate, requireTwoFactor, async (req, res) => {
    try {
      await strategyService.deleteStrategy(req.params.id, req.user!.id);
      res.json({ message: '策略已刪除' });
    } catch (error) {
      logger.error('刪除策略失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '刪除策略失敗' });
    }
  });

  // 獲取策略
  router.get('/:id', authenticate, async (req, res) => {
    try {
      const strategy = await strategyService.getStrategy(req.params.id, req.user!.id);
      res.json(strategy);
    } catch (error) {
      logger.error('獲取策略失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '獲取策略失敗' });
    }
  });

  // 列出策略
  router.get('/', authenticate, async (req, res) => {
    try {
      const strategies = await strategyService.listStrategies(req.user!.id);
      res.json(strategies);
    } catch (error) {
      logger.error('列出策略失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '列出策略失敗' });
    }
  });

  // 更新策略狀態
  router.patch('/:id/status', authenticate, requireTwoFactor, async (req, res) => {
    try {
      const { isActive } = z.object({ isActive: z.boolean() }).parse(req.body);
      const strategy = await strategyService.updateStrategyStatus(
        req.params.id,
        req.user!.id,
        isActive
      );
      res.json(strategy);
    } catch (error) {
      logger.error('更新策略狀態失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '更新策略狀態失敗' });
    }
  });

  app.use('/api/strategies', router);
}; 