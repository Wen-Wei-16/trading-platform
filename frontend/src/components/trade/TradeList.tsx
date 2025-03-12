import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import tradeService, { Trade, TradeStatus, TradeType } from '../../services/trade';

const TradeList: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const getStatusColor = (status: TradeStatus) => {
    const colors = {
      [TradeStatus.PENDING]: 'gold',
      [TradeStatus.EXECUTING]: 'blue',
      [TradeStatus.COMPLETED]: 'green',
      [TradeStatus.FAILED]: 'red'
    };
    return colors[status];
  };

  const columns: ColumnsType<Trade> = [
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
        <Tag color={type === TradeType.BUY ? 'green' : 'red'}>
          {type === TradeType.BUY ? '買入' : '賣出'}
        </Tag>
      ),
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status: TradeStatus) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
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
      title: '執行價格',
      dataIndex: 'executedPrice',
      key: 'executedPrice',
    },
    {
      title: '執行數量',
      dataIndex: 'executedQuantity',
      key: 'executedQuantity',
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
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/trades/${record.id}`)}>
            詳情
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => navigate('/trades/new')}>
          新建交易
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={trades}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default TradeList; 