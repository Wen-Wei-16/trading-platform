import api from './api';

export enum TradeType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum TradeStatus {
  PENDING = 'PENDING',
  EXECUTING = 'EXECUTING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface Trade {
  id: string;
  type: TradeType;
  status: TradeStatus;
  symbol: string;
  quantity: number;
  price: number;
  executedPrice?: number;
  executedQuantity?: number;
  createdAt: string;
  updatedAt: string;
  strategyId: string;
}

export interface CreateTradeData {
  strategyId: string;
  type: TradeType;
  symbol: string;
  quantity: number;
  price: number;
}

export interface UpdateTradeStatusData {
  status: TradeStatus;
  executedPrice?: number;
  executedQuantity?: number;
}

export interface TradeStats {
  totalTrades: number;
  successfulTrades: number;
  failedTrades: number;
  totalProfit: number;
}

class TradeService {
  async createTrade(data: CreateTradeData): Promise<Trade> {
    const response = await api.post<Trade>('/trades', data);
    return response.data;
  }

  async updateTradeStatus(id: string, data: UpdateTradeStatusData): Promise<Trade> {
    const response = await api.patch<Trade>(`/trades/${id}/status`, data);
    return response.data;
  }

  async getTrade(id: string): Promise<Trade> {
    const response = await api.get<Trade>(`/trades/${id}`);
    return response.data;
  }

  async listTrades(): Promise<Trade[]> {
    const response = await api.get<Trade[]>('/trades');
    return response.data;
  }

  async getTradeStats(): Promise<TradeStats> {
    const response = await api.get<TradeStats>('/trades/stats');
    return response.data;
  }
}

export default new TradeService(); 