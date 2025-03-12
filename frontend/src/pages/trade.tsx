import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import tradeService, { Trade, TradeStatus, TradeType } from '../services/trade';
import CreateTradeForm from '../components/trade/CreateTradeForm';

const TradePage: React.FC = () => {
  const navigate = useNavigate();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchTrades = async () => {
    try {
      setLoading(true);
      const data = await tradeService.listTrades();
      setTrades(data);
    } catch (error) {
      message.error('獲取交易列表失敗');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '類型',
      dataIndex: 'type',
      key: 'type',
      render: (type: TradeType) => (
        <span style={{ color: type === TradeType.BUY ? 'green' : 'red' }}>
          {type === TradeType.BUY ? '買入' : '賣出'}
        </span>
      ),
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status: TradeStatus) => (
        <span style={{ color: getStatusColor(status) }}>
          {status}
        </span>
      ),
    },
    {
      title: '交易對',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: '數量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '價格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '創建時間',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Trade) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/trades/${record.id}`)}>
            詳情
          </Button>
        </Space>
      ),
    },
  ];

  const getStatusColor = (status: TradeStatus) => {
    const colors = {
      [TradeStatus.PENDING]: 'gold',
      [TradeStatus.EXECUTING]: 'blue',
      [TradeStatus.COMPLETED]: 'green',
      [TradeStatus.FAILED]: 'red'
    };
    return colors[status];
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setShowCreateForm(true)}>
          創建交易
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={trades}
        rowKey="id"
        loading={loading}
      />

      {showCreateForm && (
        <CreateTradeForm
          visible={showCreateForm}
          onCancel={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false);
            fetchTrades();
          }}
        />
      )}
    </div>
  );
};

export default TradePage; 