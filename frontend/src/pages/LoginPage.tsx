import React from 'react';
import { Card, Form, Input, Button, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('登入成功！');
    navigate('/trades');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '24px' }}>
      <Card>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2}>登入</Title>
          <Paragraph>
            還沒有帳號？ <Link to="/register">立即註冊</Link>
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '請輸入電子郵件' },
              { type: 'email', message: '請輸入有效的電子郵件地址' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="電子郵件"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '請輸入密碼' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密碼"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              登入
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'right', marginBottom: '24px' }}>
            <Link to="/forgot-password">忘記密碼？</Link>
          </div>

          <Divider>或</Divider>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <Button icon={<GoogleOutlined />} block size="large">
              Google
            </Button>
            <Button icon={<FacebookOutlined />} block size="large">
              Facebook
            </Button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Paragraph>
              登入即表示您同意我們的
              <Link to="/terms">服務條款</Link>
              和
              <Link to="/privacy">隱私政策</Link>
            </Paragraph>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage; 