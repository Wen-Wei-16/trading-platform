import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TradeDashboard from '../pages/TradeDashboard';
import TradeList from '../pages/trade';
import CreateTradePage from '../pages/CreateTradePage';
import TradeDetail from '../components/trade/TradeDetail';

const TradeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TradeDashboard />} />
      <Route path="/list" element={<TradeList />} />
      <Route path="/new" element={<CreateTradePage />} />
      <Route path="/:id" element={<TradeDetail />} />
    </Routes>
  );
};

export default TradeRoutes; 