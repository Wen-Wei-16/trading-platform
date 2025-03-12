import React from 'react';
import { Card, Row, Col, Typography, Form, Input, Button, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ContactPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('訊息已發送，我們會盡快回覆您！');
    form.resetFields();
  };

  const contactInfo = [
    {
      icon: <MailOutlined />,
      title: '電子郵件',
      content: 'support@tradingplatform.com',
      description: '24小時內回覆',
    },
    {
      icon: <PhoneOutlined />,
      title: '客服電話',
      content: '(02) 1234-5678',
      description: '週一至週五 9:00-18:00',
    },
    {
      icon: <EnvironmentOutlined />,
      title: '公司地址',
      content: '台北市信義區信義路五段7號',
      description: '台北101大樓',
    },
    {
      icon: <ClockCircleOutlined />,
      title: '服務時間',
      content: '週一至週五',
      description: '9:00-18:00',
    },
  ];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>聯絡我們</Title>
        <Paragraph style={{ fontSize: '18px' }}>
          我們隨時為您提供協助
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card>
            <Title level={2}>聯絡資訊</Title>
            <Row gutter={[24, 24]}>
              {contactInfo.map((info, index) => (
                <Col xs={24} sm={12} key={index}>
                  <Card style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '24px', color: '#1890ff', marginBottom: '8px' }}>
                      {info.icon}
                    </div>
                    <Title level={4}>{info.title}</Title>
                    <Paragraph style={{ fontSize: '16px', fontWeight: 'bold' }}>
                      {info.content}
                    </Paragraph>
                    <Paragraph>{info.description}</Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Title level={2}>線上留言</Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                label="姓名"
                rules={[{ required: true, message: '請輸入您的姓名' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="電子郵件"
                rules={[
                  { required: true, message: '請輸入您的電子郵件' },
                  { type: 'email', message: '請輸入有效的電子郵件地址' }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="subject"
                label="主旨"
                rules={[{ required: true, message: '請輸入主旨' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="message"
                label="訊息內容"
                rules={[{ required: true, message: '請輸入訊息內容' }]}
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  發送訊息
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: '64px' }}>
        <Card>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
            常見問題
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card>
                <Title level={4}>開戶相關</Title>
                <Paragraph>
                  如何開立交易帳戶？需要準備哪些文件？
                  開戶流程大約需要多少時間？
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Title level={4}>交易相關</Title>
                <Paragraph>
                  如何進行交易？交易手續費如何計算？
                  支援哪些交易商品？
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Title level={4}>帳戶安全</Title>
                <Paragraph>
                  如何保護帳戶安全？忘記密碼怎麼辦？
                  如何設定雙因素認證？
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage; 