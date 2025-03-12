import React from 'react';
import { Card, Form, Input, Button, message } from 'antd';

const SettingsPage: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      // TODO: 實現設置保存邏輯
      message.success('設置已保存');
    } catch (error) {
      message.error('保存設置失敗');
    }
  };

  return (
    <Card title="系統設置">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          apiKey: '',
          apiSecret: '',
          defaultSymbol: 'BTC/USDT',
        }}
      >
        <Form.Item
          name="apiKey"
          label="API Key"
          rules={[{ required: true, message: '請輸入 API Key' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="apiSecret"
          label="API Secret"
          rules={[{ required: true, message: '請輸入 API Secret' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="defaultSymbol"
          label="默認交易對"
          rules={[{ required: true, message: '請輸入默認交易對' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存設置
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SettingsPage; 