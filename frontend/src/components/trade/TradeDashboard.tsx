import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import tradeService, { TradeStats } from '../../services/trade';

const TradeDashboard: React.FC = () => {
  const [stats, setStats] = useState<TradeStats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await tradeService.getTradeStats();
      setStats(data);
    } catch (error) {
      console.error('獲取交易統計失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return <div>加載中...</div>;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Card loading={loading}>
          <Statistic
            title="總交易數"
            value={stats.totalTrades}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card loading={loading}>
          <Statistic
            title="成功交易"
            value={stats.successfulTrades}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card loading={loading}>
          <Statistic
            title="失敗交易"
            value={stats.failedTrades}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card loading={loading}>
          <Statistic
            title="總利潤"
            value={stats.totalProfit}
            precision={2}
            valueStyle={{ color: stats.totalProfit >= 0 ? '#3f8600' : '#cf1322' }}
            prefix={stats.totalProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default TradeDashboard; 