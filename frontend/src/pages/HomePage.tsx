import React from 'react';
import { Carousel, Card, Row, Col, Button, Typography, Statistic } from 'antd';
import { ArrowRightOutlined, LineChartOutlined, SafetyCertificateOutlined, GlobalOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: '專業交易工具',
      description: '提供先進的交易工具和技術分析',
      icon: <LineChartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
    },
    {
      title: '安全可靠',
      description: '採用最先進的安全技術保護您的資產',
      icon: <SafetyCertificateOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
    },
    {
      title: '全球市場',
      description: '連接全球主要金融市場',
      icon: <GlobalOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
    },
    {
      title: '專業支援',
      description: '24/7 專業客服團隊為您服務',
      icon: <TeamOutlined style={{ fontSize: '48px', color: '#faad14' }} />,
    },
  ];

  return (
    <div>
      <div className={styles.bannerSection}>
        <div className={styles.bannerContent}>
          <Title level={1} className={styles.animatedTitle}>
            專業的交易平台
          </Title>
          <Paragraph className={styles.animatedParagraph}>
            為您提供全方位的交易解決方案，從股票到加密貨幣，
            從技術分析到風險管理，我們應有盡有。
          </Paragraph>
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate('/register')}
            className={styles.animatedButton}
          >
            立即開始交易
          </Button>
        </div>
        <div className={styles.statsSection}>
          <Row gutter={[24, 24]}>
            <Col xs={12} sm={6}>
              <Statistic
                title="全球用戶"
                value={100000}
                prefix={<GlobalOutlined />}
                valueStyle={{ color: '#fff' }}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title="交易量"
                value={1000000000}
                prefix="NT$"
                suffix="+"
                valueStyle={{ color: '#fff' }}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title="服務國家"
                value={20}
                prefix={<GlobalOutlined />}
                valueStyle={{ color: '#fff' }}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title="客戶滿意度"
                value={98}
                suffix="%"
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#fff' }}
              />
            </Col>
          </Row>
        </div>
      </div>

      <div style={{ padding: '64px 24px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
          我們的優勢
        </Title>
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card
                hoverable
                style={{ textAlign: 'center', height: '100%' }}
                bodyStyle={{ padding: '24px' }}
              >
                <div style={{ marginBottom: '16px' }}>
                  {feature.icon}
                </div>
                <Title level={4}>{feature.title}</Title>
                <Paragraph>{feature.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ 
        background: '#f0f2f5', 
        padding: '64px 24px',
        textAlign: 'center' 
      }}>
        <Title level={2}>準備好開始交易了嗎？</Title>
        <Paragraph style={{ fontSize: '18px', marginBottom: '32px' }}>
          立即加入我們，開啟您的交易之旅
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

export default HomePage; 