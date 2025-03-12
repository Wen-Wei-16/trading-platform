import React from 'react';
import { Card, Row, Col, Typography, Button, List, Tag, Progress } from 'antd';
import { CheckCircleOutlined, CrownOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const MembershipPage: React.FC = () => {
  const navigate = useNavigate();

  const membershipPlans = [
    {
      title: '基本會員',
      price: '免費',
      features: [
        '基本交易功能',
        '即時市場數據',
        '基本技術指標',
        '電子郵件支援',
      ],
      color: '#1890ff',
      icon: <StarOutlined />,
    },
    {
      title: '進階會員',
      price: 'NT$ 1,999/月',
      features: [
        '進階交易工具',
        '專業技術分析',
        '自動化交易',
        '優先客服支援',
        'VIP研討會',
        '專屬交易策略',
      ],
      color: '#722ed1',
      icon: <CrownOutlined />,
    },
  ];

  const benefits = [
    {
      title: '交易優惠',
      items: [
        '手續費優惠',
        'VIP專屬費率',
        '交易回饋',
        '生日特惠',
      ],
    },
    {
      title: '專業服務',
      items: [
        '專屬客服經理',
        '24/7交易支援',
        '市場分析報告',
        '投資顧問服務',
      ],
    },
    {
      title: '學習資源',
      items: [
        '線上課程',
        '交易研討會',
        '策略分享會',
        '市場分析報告',
      ],
    },
  ];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>會員方案</Title>
        <Paragraph style={{ fontSize: '18px' }}>
          選擇最適合您的會員方案
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {membershipPlans.map((plan, index) => (
          <Col xs={24} md={12} key={index}>
            <Card
              hoverable
              style={{ height: '100%' }}
              actions={[
                <Button type="primary" onClick={() => navigate('/register')}>
                  立即加入
                </Button>,
              ]}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '48px', color: plan.color, marginBottom: '16px' }}>
                  {plan.icon}
                </div>
                <Title level={2}>{plan.title}</Title>
                <Title level={3} style={{ color: plan.color }}>
                  {plan.price}
                </Title>
              </div>
              <List
                size="large"
                dataSource={plan.features}
                renderItem={item => (
                  <List.Item>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    {item}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: '64px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
          會員權益
        </Title>
        <Row gutter={[24, 24]}>
          {benefits.map((benefit, index) => (
            <Col xs={24} md={8} key={index}>
              <Card>
                <Title level={4}>{benefit.title}</Title>
                <List
                  size="small"
                  dataSource={benefit.items}
                  renderItem={item => (
                    <List.Item>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      {item}
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ marginTop: '64px', textAlign: 'center' }}>
        <Title level={2}>會員等級</Title>
        <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
          <Col span={8}>
            <Card>
              <Title level={4}>銅牌會員</Title>
              <Progress percent={30} status="active" />
              <Paragraph>交易額度：NT$ 100,000</Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Title level={4}>銀牌會員</Title>
              <Progress percent={60} status="active" />
              <Paragraph>交易額度：NT$ 500,000</Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Title level={4}>金牌會員</Title>
              <Progress percent={100} status="active" />
              <Paragraph>交易額度：無限制</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: '64px', textAlign: 'center' }}>
        <Title level={2}>準備好升級會員了嗎？</Title>
        <Paragraph style={{ fontSize: '18px', marginBottom: '32px' }}>
          立即加入，享受更多會員權益
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

export default MembershipPage; 