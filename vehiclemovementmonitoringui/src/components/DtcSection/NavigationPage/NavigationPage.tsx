import  React, {useState,useEffect} from 'react';
import { Button, Layout, ConfigProvider, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
//import './NavigationPage.css';

const { Content } = Layout;

const NavigationPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCheck = () => {
        // Логика для "КПП ВЪЕЗД"
        navigate('/dtc/check');
    };

    const handleCollection = () => {
        // Логика для "ЦЕХ"
        navigate('/dtc/workshop');
    };

    const handleProtocol = () => {
        // Логика для "КПП ВЫЕЗД"
        navigate('/dtc/exit');
    };

    const handleInventory = () => {
        // Логика для "МОНИТОРИНГ"
        navigate('/dtc/monitoring');
    };
    
    const handleBackToMain = () =>{
        // Логика для "НА ГЛАВНУЮ"
        navigate('/navigate');
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
                            onClick={handleCheck}
                        >
                            ПРОВЕРИТЬ
                        </Button>

                        <Button
                            type="primary"
                            className="menu-button"
                            onClick={handleCollection}
                        >
                            КОМПЛЕКТОВАНИЕ
                        </Button>

                        <Button
                            type="primary"
                            className="menu-button"
                            onClick={handleProtocol}
                        >
                            ПРОТОКОЛЫ
                        </Button>

                        <Button
                            type="primary"
                            className="menu-button"
                            onClick={handleInventory}
                        >
                            ИНВЕНТАРИЗАЦИЯ
                        </Button>

                        <Button
                            type="default"
                            className="red-button"
                            onClick={handleBackToMain}
                        >
                            НАЗАД
                        </Button>
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default NavigationPage;