import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Button, message, Tag } from 'antd';
import dayjs from 'dayjs';
import tradeService, { Trade, TradeStatus, TradeType } from '../../services/trade';

const TradeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trade, setTrade] = useState<Trade | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTrade = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await tradeService.getTrade(id);
      setTrade(data);
    } catch (error) {
      message.error('獲取交易詳情失敗');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrade();
  }, [id]);

  const getStatusColor = (status: TradeStatus) => {
    const colors = {
      [TradeStatus.PENDING]: 'gold',
      [TradeStatus.EXECUTING]: 'blue',
      [TradeStatus.COMPLETED]: 'green',
      [TradeStatus.FAILED]: 'red'
    };
    return colors[status];
  };

  if (!trade) {
    return <div>加載中...</div>;
  }

  return (
    <Card
      title="交易詳情"
      extra={
        <Button onClick={() => navigate('/trades')}>
          返回列表
        </Button>
      }
    >
      <Descriptions bordered>
        <Descriptions.Item label="ID">{trade.id}</Descriptions.Item>
        <Descriptions.Item label="類型">
          <Tag color={trade.type === TradeType.BUY ? 'green' : 'red'}>
            {trade.type === TradeType.BUY ? '買入' : '賣出'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="狀態">
          <Tag color={getStatusColor(trade.status)}>
            {trade.status}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="交易對">{trade.symbol}</Descriptions.Item>
        <Descriptions.Item label="數量">{trade.quantity}</Descriptions.Item>
        <Descriptions.Item label="價格">{trade.price}</Descriptions.Item>
        <Descriptions.Item label="執行價格">
          {trade.executedPrice || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="執行數量">
          {trade.executedQuantity || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="策略ID">{trade.strategyId}</Descriptions.Item>
        <Descriptions.Item label="創建時間">
          {dayjs(trade.createdAt).format('YYYY-MM-DD HH:mm:ss')}
        </Descriptions.Item>
        <Descriptions.Item label="更新時間">
          {dayjs(trade.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default TradeDetail; 