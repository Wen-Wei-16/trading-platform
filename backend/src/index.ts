import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import { setupAuthRoutes } from './routes/auth';
import { setupStrategyRoutes } from './routes/strategy';
import { setupTradeRoutes } from './routes/trade';
import { logger } from './utils/logger';

// 載入環境變數
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(express.json());

// 路由
setupAuthRoutes(app);
setupStrategyRoutes(app);
setupTradeRoutes(app);

// 數據庫連接
AppDataSource.initialize()
  .then(() => {
    logger.info('數據庫連接成功');
    app.listen(port, () => {
      logger.info(`服務器運行在 http://localhost:${port}`);
    });
  })
  .catch((error) => {
    logger.error('數據庫連接失敗:', error);
    process.exit(1);
  });
