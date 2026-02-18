import  React, {useState,useEffect} from 'react';
import { Button, Layout, ConfigProvider, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import './NavigationPage.css';

const { Content } = Layout;

const NavigationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleEntry = () => {
    // Логика для "КПП ВЪЕЗД"
    navigate('/entry');
  };

  const handleWorkshop = () => {
    // Логика для "ЦЕХ"
    navigate('/workshop');
  };

  const handleExit = () => {
    // Логика для "КПП ВЫЕЗД"
    navigate('/exit');
  };

  const handleMonitoring = () => {
    // Логика для "МОНИТОРИНГ"
    navigate('/monitoring');
  };

  const handleCheck = () => {
    // Логика для "ТСД"
    navigate('/dtc/navigate');
  };

  const handleBackToMain = () =>{
    // Логика для "НА ГЛАВНУЮ"
    navigate('/dashboard');
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
      }
    }, []);

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
        <div className="button-group">
          <Button 
            type="primary" 
            className="menu-button"
            onClick={handleEntry}
          >
            КПП ВЪЕЗД
          </Button>
          
          <Button 
            type="primary" 
            className="menu-button"
            onClick={handleWorkshop}
          >
            ЦЕХ
          </Button>
          
          <Button 
            type="primary" 
            className="menu-button"
            onClick={handleExit}
          >
            КПП ВЫЕЗД
          </Button>
          
          <Button 
            type="primary" 
            className="menu-button"
            onClick={handleMonitoring}
          >
            МОНИТОРИНГ
          </Button>

          <Button 
            type="primary" 
            className="menu-button"
            onClick={handleCheck}
          >
            ТСД
          </Button>
          
          <Button 
            type="default" 
            className="red-button"
            onClick={handleBackToMain}
          >
            НА ГЛАВНУЮ
          </Button>
        </div>
      </Content>
    </Layout>
    </ConfigProvider>
  );
};

export default NavigationPage;