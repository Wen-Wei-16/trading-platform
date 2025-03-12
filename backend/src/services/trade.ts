import { AppDataSource } from '../config/database';
import { Trade, TradeType, TradeStatus } from '../models/Trade';
import { User } from '../models/User';
import { Strategy } from '../models/Strategy';
import { logger } from '../utils/logger';

export class TradeService {
  private tradeRepository = AppDataSource.getRepository(Trade);

  async createTrade(
    userId: string,
    strategyId: string,
    type: TradeType,
    symbol: string,
    quantity: number,
    price: number
  ): Promise<Trade> {
    const userRepository = AppDataSource.getRepository(User);
    const strategyRepository = AppDataSource.getRepository(Strategy);

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('用戶不存在');
    }

    const strategy = await strategyRepository.findOne({
      where: { id: strategyId, user: { id: userId } }
    });
    if (!strategy) {
      throw new Error('策略不存在或無權限');
    }

    const trade = this.tradeRepository.create({
      type,
      symbol,
      quantity,
      price,
      status: TradeStatus.PENDING,
      user,
      strategy
    });

    await this.tradeRepository.save(trade);
    logger.info(`用戶 ${userId} 創建交易: ${symbol} ${type} ${quantity}`);
    return trade;
  }

  async updateTradeStatus(
    tradeId: string,
    userId: string,
    status: TradeStatus,
    executedPrice?: number,
    executedQuantity?: number
  ): Promise<Trade> {
    const trade = await this.tradeRepository.findOne({
      where: { id: tradeId, user: { id: userId } }
    });

    if (!trade) {
      throw new Error('交易不存在或無權限');
    }

    trade.status = status;
    if (executedPrice !== undefined) {
      trade.executedPrice = executedPrice;
    }
    if (executedQuantity !== undefined) {
      trade.executedQuantity = executedQuantity;
    }

    await this.tradeRepository.save(trade);
    logger.info(`用戶 ${userId} 更新交易狀態: ${trade.symbol} ${status}`);
    return trade;
  }

  async getTrade(tradeId: string, userId: string): Promise<Trade> {
    const trade = await this.tradeRepository.findOne({
      where: { id: tradeId, user: { id: userId } }
    });

    if (!trade) {
      throw new Error('交易不存在或無權限');
    }

    return trade;
  }

  async listTrades(userId: string): Promise<Trade[]> {
    return this.tradeRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }
    });
  }

  async getTradeStats(userId: string): Promise<{
    totalTrades: number;
    successfulTrades: number;
    failedTrades: number;
    totalProfit: number;
  }> {
    const trades = await this.tradeRepository.find({
      where: { user: { id: userId } }
    });

    const totalTrades = trades.length;
    const successfulTrades = trades.filter(t => t.status === TradeStatus.COMPLETED).length;
    const failedTrades = trades.filter(t => t.status === TradeStatus.FAILED).length;

    const totalProfit = trades.reduce((sum, trade) => {
      if (trade.status === TradeStatus.COMPLETED && trade.executedPrice && trade.executedQuantity) {
        const profit = trade.type === TradeType.BUY
          ? (trade.price - trade.executedPrice) * trade.executedQuantity
          : (trade.executedPrice - trade.price) * trade.executedQuantity;
        return sum + profit;
      }
      return sum;
    }, 0);

    return {
      totalTrades,
      successfulTrades,
      failedTrades,
      totalProfit
    };
  }
} 