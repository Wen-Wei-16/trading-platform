import React from 'react';
import { Card, Row, Col, Typography, Timeline, Avatar, Statistic } from 'antd';
import { TeamOutlined, TrophyOutlined, SafetyCertificateOutlined, GlobalOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
  const companyHistory = [
    {
      year: '2020',
      title: '公司成立',
      description: '成立於台北，開始提供交易服務',
    },
    {
      year: '2021',
      title: '業務擴展',
      description: '擴展至香港和新加坡市場',
    },
    {
      year: '2022',
      title: '技術升級',
      description: '推出新一代交易平台',
    },
    {
      year: '2023',
      title: '全球布局',
      description: '進軍歐美市場，建立全球服務網絡',
    },
  ];

  const teamMembers = [
    {
      name: '張志明',
      title: '執行長',
      avatar: 'https://via.placeholder.com/150',
      description: '擁有20年金融市場經驗',
    },
    {
      name: '李美玲',
      title: '技術總監',
      avatar: 'https://via.placeholder.com/150',
      description: '專注於金融科技創新',
    },
    {
      name: '王建國',
      title: '市場總監',
      avatar: 'https://via.placeholder.com/150',
      description: '負責全球市場策略',
    },
  ];

  const values = [
    {
      icon: <SafetyCertificateOutlined />,
      title: '誠信經營',
      description: '以誠信為本，為客戶提供最優質的服務',
    },
    {
      icon: <TrophyOutlined />,
      title: '追求卓越',
      description: '持續創新，不斷提升服務品質',
    },
    {
      icon: <TeamOutlined />,
      title: '以客為尊',
      description: '以客戶需求為導向，提供專業的解決方案',
    },
    {
      icon: <GlobalOutlined />,
      title: '全球視野',
      description: '放眼全球市場，把握國際商機',
    },
  ];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>關於我們</Title>
        <Paragraph style={{ fontSize: '18px' }}>
          專業的交易平台，為您提供最優質的服務
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card>
            <Title level={2}>公司簡介</Title>
            <Paragraph>
              我們是一家專注於提供專業交易服務的金融科技公司。自2020年成立以來，
              我們致力於為全球投資者提供安全、便捷、專業的交易平台。
            </Paragraph>
            <Paragraph>
              憑藉先進的技術和專業的團隊，我們為客戶提供全方位的交易解決方案，
              包括股票、期貨、加密貨幣等多個市場的交易服務。
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Title level={2}>發展歷程</Title>
            <Timeline>
              {companyHistory.map((item, index) => (
                <Timeline.Item key={index}>
                  <Title level={4}>{item.year}</Title>
                  <Paragraph>{item.title}</Paragraph>
                  <Paragraph>{item.description}</Paragraph>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: '64px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
          核心價值
        </Title>
        <Row gutter={[24, 24]}>
          {values.map((value, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }}>
                  {value.icon}
                </div>
                <Title level={4}>{value.title}</Title>
                <Paragraph>{value.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ marginTop: '64px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
          管理團隊
        </Title>
        <Row gutter={[24, 24]}>
          {teamMembers.map((member, index) => (
            <Col xs={24} md={8} key={index}>
              <Card style={{ textAlign: 'center' }}>
                <Avatar size={120} src={member.avatar} style={{ marginBottom: '16px' }} />
                <Title level={4}>{member.name}</Title>
                <Paragraph style={{ color: '#1890ff' }}>{member.title}</Paragraph>
                <Paragraph>{member.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ marginTop: '64px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
          公司成就
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="全球用戶"
                value={100000}
                prefix={<GlobalOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="交易量"
                value={1000000000}
                prefix="NT$"
                suffix="+"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="服務國家"
                value={20}
                prefix={<GlobalOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="客戶滿意度"
                value={98}
                suffix="%"
                prefix={<TrophyOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutPage; 