import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, message } from 'antd';
import { Strategy } from '../../services/strategy';
import strategyService from '../../services/strategy';
import tradeService from '../../services/trade';

interface CreateTradeFormProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateTradeForm: React.FC<CreateTradeFormProps> = ({
  visible,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchStrategies();
    }
  }, [visible]);

  const fetchStrategies = async () => {
    try {
      const data = await strategyService.listStrategies();
      setStrategies(data);
    } catch (error) {
      message.error('獲取策略列表失敗');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await tradeService.createTrade(values);
      message.success('創建交易成功');
      form.resetFields();
      onSuccess();
    } catch (error) {
      message.error('創建交易失敗');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="創建交易"
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="strategyId"
          label="策略"
          rules={[{ required: true, message: '請選擇策略' }]}
        >
          <Select>
            {strategies.map(strategy => (
              <Select.Option key={strategy.id} value={strategy.id}>
                {strategy.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="symbol"
          label="交易對"
          rules={[{ required: true, message: '請輸入交易對' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="類型"
          rules={[{ required: true, message: '請選擇類型' }]}
        >
          <Select>
            <Select.Option value="BUY">買入</Select.Option>
            <Select.Option value="SELL">賣出</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="quantity"
          label="數量"
          rules={[{ required: true, message: '請輸入數量' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="price"
          label="價格"
          rules={[{ required: true, message: '請輸入價格' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTradeForm; 