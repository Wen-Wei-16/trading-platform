import { Express } from 'express';
import { z } from 'zod';
import { TradeService } from '../services/trade';
import { TradeType, TradeStatus } from '../models/Trade';
import { authenticate, requireTwoFactor } from '../middleware/auth';
import { logger } from '../utils/logger';

const tradeService = new TradeService();

const createTradeSchema = z.object({
  strategyId: z.string(),
  type: z.nativeEnum(TradeType),
  symbol: z.string(),
  quantity: z.number().positive(),
  price: z.number().positive()
});

const updateTradeStatusSchema = z.object({
  status: z.nativeEnum(TradeStatus),
  executedPrice: z.number().positive().optional(),
  executedQuantity: z.number().positive().optional()
});

export const setupTradeRoutes = (app: Express) => {
  const router = app.Router();

  // 創建交易
  router.post('/', authenticate, requireTwoFactor, async (req, res) => {
    try {
      const data = createTradeSchema.parse(req.body);
      const trade = await tradeService.createTrade(
        req.user!.id,
        data.strategyId,
        data.type,
        data.symbol,
        data.quantity,
        data.price
      );
      res.json(trade);
    } catch (error) {
      logger.error('創建交易失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '創建交易失敗' });
    }
  });

  // 更新交易狀態
  router.patch('/:id/status', authenticate, requireTwoFactor, async (req, res) => {
    try {
      const data = updateTradeStatusSchema.parse(req.body);
      const trade = await tradeService.updateTradeStatus(
        req.params.id,
        req.user!.id,
        data.status,
        data.executedPrice,
        data.executedQuantity
      );
      res.json(trade);
    } catch (error) {
      logger.error('更新交易狀態失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '更新交易狀態失敗' });
    }
  });

  // 獲取交易
  router.get('/:id', authenticate, async (req, res) => {
    try {
      const trade = await tradeService.getTrade(req.params.id, req.user!.id);
      res.json(trade);
    } catch (error) {
      logger.error('獲取交易失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '獲取交易失敗' });
    }
  });

  // 列出交易
  router.get('/', authenticate, async (req, res) => {
    try {
      const trades = await tradeService.listTrades(req.user!.id);
      res.json(trades);
    } catch (error) {
      logger.error('列出交易失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '列出交易失敗' });
    }
  });

  // 獲取交易統計
  router.get('/stats', authenticate, async (req, res) => {
    try {
      const stats = await tradeService.getTradeStats(req.user!.id);
      res.json(stats);
    } catch (error) {
      logger.error('獲取交易統計失敗:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : '獲取交易統計失敗' });
    }
  });

  app.use('/api/trades', router);
}; 