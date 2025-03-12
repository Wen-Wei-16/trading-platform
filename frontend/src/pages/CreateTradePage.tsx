import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTradeForm from '../components/trade/CreateTradeForm';

const CreateTradePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CreateTradeForm
      visible={true}
      onCancel={() => navigate('/trades')}
      onSuccess={() => navigate('/trades')}
    />
  );
};

export default CreateTradePage; 