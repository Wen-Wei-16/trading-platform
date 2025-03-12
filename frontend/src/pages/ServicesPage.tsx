import React from 'react';
import { Card, Row, Col, Typography, Button, List } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: '即時交易',
      description: '提供即時市場數據和快速交易執行',
      features: [
        '毫秒級交易執行',
        '即時市場報價',
        '多種交易工具',
        '自動化交易支持',
      ],
      price: '免費',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: '技術分析',
      description: '專業的技術分析工具和指標',
      features: [
        '多種技術指標',
        '自定義圖表',
        '歷史數據分析',
        '預測模型',
      ],
      price: '進階會員',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: '風險管理',
      description: '完整的風險控制和管理工具',
      features: [
        '止損止盈',
        '倉位管理',
        '風險評估',
        '資金管理',
      ],
      price: '進階會員',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  const tradingFeatures = [
    {
      title: '多市場支持',
      description: '支持股票、期貨、加密貨幣等多個市場',
    },
    {
      title: '專業分析工具',
      description: '提供技術分析、基本面分析等專業工具',
    },
    {
      title: '自動化交易',
      description: '支持策略編寫和自動化交易執行',
    },
    {
      title: '風險控制',
      description: '完整的風險管理系統和工具',
    },
  ];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>專業交易服務</Title>
        <Paragraph style={{ fontSize: '18px' }}>
          為您提供全方位的交易解決方案
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {services.map((service, index) => (
          <Col xs={24} md={8} key={index}>
            <Card
              hoverable
              cover={
                <div style={{ 
                  height: '200px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img 
                    alt={service.title} 
                    src={service.image}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </div>
              }
              actions={[
                <Button type="primary" onClick={() => navigate('/register')}>
                  立即開始
                </Button>,
              ]}
            >
              <Card.Meta
                title={service.title}
                description={service.description}
              />
              <List
                size="small"
                dataSource={service.features}
                renderItem={item => (
                  <List.Item>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    {item}
                  </List.Item>
                )}
              />
              <div style={{ marginTop: '16px', textAlign: 'right' }}>
                <span style={{ color: '#1890ff', fontWeight: 'bold' }}>
                  {service.price}
                </span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: '64px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
          交易功能特點
        </Title>
        <Row gutter={[24, 24]}>
          {tradingFeatures.map((feature, index) => (
            <Col xs={24} sm={12} key={index}>
              <Card>
                <Title level={4}>{feature.title}</Title>
                <Paragraph>{feature.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ marginTop: '64px', textAlign: 'center' }}>
        <Title level={2}>準備好開始交易了嗎？</Title>
        <Paragraph style={{ fontSize: '18px', marginBottom: '32px' }}>
          加入我們，體驗專業的交易服務
        </Paragraph>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/register')}
        >
          立即註冊
        </Button>
      </div>
    </div>
  );
};

export default ServicesPage; 