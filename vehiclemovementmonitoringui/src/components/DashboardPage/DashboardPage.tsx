import React, { useEffect, useState } from 'react';
import { Button, message, Layout, ConfigProvider, theme, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

const { Content } = Layout;

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<{ name: string; surname: string; patronymic: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (e) {
        console.error('Ошибка парсинга данных пользователя:', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/auth');
      }
    } else {
      localStorage.removeItem('token');
      navigate('/auth');
    }
  }, [navigate]);

  const handleStartWork = () => {
    navigate('/navigate')
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  if (!user) {
    return <div className="loading">Загрузка...</div>;
  }

  const fullName = `${user.surname} ${user.name} ${user.patronymic}`;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#0066ff',
          borderRadius: 8,
          fontSize: 16,
        },
      }}
    >
      <Layout className="navigate-layout">
        <Content className="navigate-container">
          <Flex 
            vertical 
            className="entry-flex"
          >
            <div className="user-info">
              <div className="user-label">Пользователь:</div>
              <div className="user-name">{fullName}</div>
            </div>
            
            <div className="button-container">
              <Button 
                type="primary" 
                className="menu-button"
                onClick={handleStartWork}
              >
                НАЧАТЬ РАБОТУ
              </Button>
              
              <Button 
                type="default" 
                className="red-button"
                onClick={handleLogout}
              >
                ВЫЙТИ
              </Button>
            </div>
          </Flex>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardPage;