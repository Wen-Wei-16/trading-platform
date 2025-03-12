import { Express } from 'express';
import { setupAuthRoutes } from './auth';
import { setupStrategyRoutes } from './strategy';
import { setupTradeRoutes } from './trade';
import { setupUserRoutes } from './user';

export const setupRoutes = (app: Express) => {
  // 健康檢查
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // API 路由
  setupAuthRoutes(app);
  setupStrategyRoutes(app);
  setupTradeRoutes(app);
  setupUserRoutes(app);
}; 