import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Dropdown, Space } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  LineChartOutlined,
  UserOutlined,
  InfoCircleOutlined,
  MailOutlined,
  MenuOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">首頁</Link>,
    },
    {
      key: '/services',
      icon: <LineChartOutlined />,
      label: <Link to="/services">專業服務</Link>,
    },
    {
      key: '/membership',
      icon: <UserOutlined />,
      label: <Link to="/membership">會員中心</Link>,
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: <Link to="/about">關於我們</Link>,
    },
    {
      key: '/contact',
      icon: <MailOutlined />,
      label: <Link to="/contact">聯絡我們</Link>,
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '個人資料',
    },
    {
      key: 'trades',
      icon: <LineChartOutlined />,
      label: '交易記錄',
    },
    {
      key: 'settings',
      icon: <InfoCircleOutlined />,
      label: '帳戶設置',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '登出',
    },
  ];

  return (
    <Layout>
      <Header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1, 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center',
        background: colorBgContainer,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div className="logo" style={{ marginRight: '48px' }}>
          <Link to="/" style={{ color: '#1890ff', fontSize: '20px', fontWeight: 'bold' }}>
            交易平台
          </Link>
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1 }}
        />
        <Space>
          {isLoggedIn ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button type="text" icon={<UserOutlined />}>
                會員中心
              </Button>
            </Dropdown>
          ) : (
            <>
              <Button type="text" icon={<UserOutlined />} onClick={() => navigate('/login')}>
                登入
              </Button>
              <Button type="primary" icon={<UserAddOutlined />} onClick={() => navigate('/register')}>
                註冊
              </Button>
            </>
          )}
        </Space>
      </Header>
      <Content style={{ padding: '24px 50px', minHeight: 'calc(100vh - 64px - 70px)' }}>
        <div style={{ 
          padding: 24, 
          minHeight: 360, 
          background: colorBgContainer,
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', background: colorBgContainer }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h3>關於我們</h3>
              <p>專業的交易平台，為您提供最優質的服務</p>
            </div>
            <div>
              <h3>聯絡方式</h3>
              <p>Email: support@tradingplatform.com</p>
              <p>電話: (02) 1234-5678</p>
            </div>
            <div>
              <h3>關注我們</h3>
              <p>Facebook</p>
              <p>Twitter</p>
              <p>LinkedIn</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '24px' }}>
            交易平台 ©{new Date().getFullYear()} Created by Your Company
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default MainLayout; 