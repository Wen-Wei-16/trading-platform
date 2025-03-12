import { AppDataSource } from '../config/database';
import { Strategy } from '../models/Strategy';
import { User } from '../models/User';
import { logger } from '../utils/logger';

export class StrategyService {
  private strategyRepository = AppDataSource.getRepository(Strategy);

  async createStrategy(
    userId: string,
    name: string,
    description: string,
    code: string,
    parameters: Record<string, any>
  ): Promise<Strategy> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('用戶不存在');
    }

    const strategy = this.strategyRepository.create({
      name,
      description,
      code,
      parameters,
      user
    });

    await this.strategyRepository.save(strategy);
    logger.info(`用戶 ${userId} 創建策略: ${name}`);
    return strategy;
  }

  async updateStrategy(
    strategyId: string,
    userId: string,
    updates: Partial<Strategy>
  ): Promise<Strategy> {
    const strategy = await this.strategyRepository.findOne({
      where: { id: strategyId, user: { id: userId } }
    });

    if (!strategy) {
      throw new Error('策略不存在或無權限');
    }

    Object.assign(strategy, updates);
    await this.strategyRepository.save(strategy);
    logger.info(`用戶 ${userId} 更新策略: ${strategy.name}`);
    return strategy;
  }

  async deleteStrategy(strategyId: string, userId: string): Promise<void> {
    const strategy = await this.strategyRepository.findOne({
      where: { id: strategyId, user: { id: userId } }
    });

    if (!strategy) {
      throw new Error('策略不存在或無權限');
    }

    await this.strategyRepository.remove(strategy);
    logger.info(`用戶 ${userId} 刪除策略: ${strategy.name}`);
  }

  async getStrategy(strategyId: string, userId: string): Promise<Strategy> {
    const strategy = await this.strategyRepository.findOne({
      where: { id: strategyId, user: { id: userId } }
    });

    if (!strategy) {
      throw new Error('策略不存在或無權限');
    }

    return strategy;
  }

  async listStrategies(userId: string): Promise<Strategy[]> {
    return this.strategyRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }
    });
  }

  async updateStrategyStatus(
    strategyId: string,
    userId: string,
    isActive: boolean
  ): Promise<Strategy> {
    const strategy = await this.strategyRepository.findOne({
      where: { id: strategyId, user: { id: userId } }
    });

    if (!strategy) {
      throw new Error('策略不存在或無權限');
    }

    strategy.isActive = isActive;
    await this.strategyRepository.save(strategy);
    logger.info(`用戶 ${userId} ${isActive ? '啟用' : '禁用'}策略: ${strategy.name}`);
    return strategy;
  }
} 