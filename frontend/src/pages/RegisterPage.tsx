import React from 'react';
import { Card, Form, Input, Button, Typography, Divider, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('註冊成功！');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '24px' }}>
      <Card>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2}>註冊</Title>
          <Paragraph>
            已有帳號？ <Link to="/login">立即登入</Link>
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: '請輸入姓名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="姓名"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '請輸入電子郵件' },
              { type: 'email', message: '請輸入有效的電子郵件地址' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="電子郵件"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '請輸入手機號碼' },
              { pattern: /^09\d{8}$/, message: '請輸入有效的手機號碼' }
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="手機號碼"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '請輸入密碼' },
              { min: 8, message: '密碼長度至少8個字元' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密碼"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '請確認密碼' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('兩次輸入的密碼不一致'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="確認密碼"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              { validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('請同意服務條款和隱私政策')),
              }
            ]}
          >
            <Checkbox>
              我已閱讀並同意
              <Link to="/terms">服務條款</Link>
              和
              <Link to="/privacy">隱私政策</Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              註冊
            </Button>
          </Form.Item>

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
              註冊即表示您同意我們的
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

export default RegisterPage; 