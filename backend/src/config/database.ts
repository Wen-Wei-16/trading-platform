import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Strategy } from '../models/Strategy';
import { Trade } from '../models/Trade';
import { logger } from '../utils/logger';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development', // 開發環境自動同步數據庫結構
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Strategy, Trade],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('數據庫連接成功');
  } catch (error) {
    logger.error('數據庫連接失敗:', error);
    process.exit(1);
  }
}; 