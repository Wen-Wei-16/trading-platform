import api from './api';

export interface Strategy {
  id: string;
  name: string;
  description?: string;
  code: string;
  parameters: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStrategyData {
  name: string;
  description?: string;
  code: string;
  parameters: Record<string, any>;
}

export interface UpdateStrategyData {
  name?: string;
  description?: string;
  code?: string;
  parameters?: Record<string, any>;
  isActive?: boolean;
}

class StrategyService {
  async createStrategy(data: CreateStrategyData): Promise<Strategy> {
    const response = await api.post<Strategy>('/strategies', data);
    return response.data;
  }

  async updateStrategy(id: string, data: UpdateStrategyData): Promise<Strategy> {
    const response = await api.put<Strategy>(`/strategies/${id}`, data);
    return response.data;
  }

  async deleteStrategy(id: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(`/strategies/${id}`);
    return response.data;
  }

  async getStrategy(id: string): Promise<Strategy> {
    const response = await api.get<Strategy>(`/strategies/${id}`);
    return response.data;
  }

  async listStrategies(): Promise<Strategy[]> {
    const response = await api.get<Strategy[]>('/strategies');
    return response.data;
  }

  async updateStrategyStatus(id: string, isActive: boolean): Promise<Strategy> {
    const response = await api.patch<Strategy>(`/strategies/${id}/status`, { isActive });
    return response.data;
  }
}

export default new StrategyService(); 