import React, { useState, useEffect } from 'react';
import { WarningOutlined } from '@ant-design/icons';
import { Button, Layout, ConfigProvider, theme, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;

interface ErrorPageProps {
    errorCode?: string;
    errorMessage?: string;
    errorDescription?: string;
    showHomeButton?: boolean;
    homeButtonText?: string;
    showBackButton?: boolean;
    backButtonText?: string;
    onHomeClick?: () => void;
    onBackClick?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
                                                 errorCode = 'ERROR',
                                                 errorMessage = 'Произошла ошибка',
                                                 errorDescription = 'Не удалось выполнить операцию. Попробуйте снова.',
                                                 showHomeButton = true,
                                                 homeButtonText = 'НА ГЛАВНУЮ',
                                                 showBackButton = true,
                                                 backButtonText = 'НАЗАД',
                                                 onHomeClick,
                                                 onBackClick
                                             }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
        }
    }, []);

    const handleHomeClick = () => {
        if (onHomeClick) onHomeClick();
        else navigate('/');
    };

    const handleBackClick = () => {
        if (onBackClick) onBackClick();
        else navigate(-1);
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#ff3333',
                    borderRadius: 8,
                    fontSize: 16,
                },
            }}
        >
            <Layout className="error-layout">
                <Content className="error-container">
                    <div className="error-form">
                        <div className='error-info'>
                            <Card className="error-card" style={{ padding: 0, border: 'none', boxShadow: 'none' }}>
                                <WarningOutlined className="error-icon" />
                                <Title level={2} className="error-code">{errorCode}</Title>
                                <Title level={3} className="error-message">{errorMessage}</Title>
                                <Text className="error-description">{errorDescription}</Text>
                            </Card>
                        </div>

                        <div className="error-buttons">
                            {showBackButton && (
                                <Button
                                    type="default"
                                    className="error-button back-button"
                                    onClick={handleBackClick}
                                    size="large"
                                    block
                                >
                                    {backButtonText}
                                </Button>
                            )}

                            {showHomeButton && (
                                <Button
                                    type="default"
                                    className="error-button home-button"
                                    onClick={handleHomeClick}
                                    size="large"
                                    block
                                >
                                    {homeButtonText}
                                </Button>
                            )}
                        </div>
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default ErrorPage; // ✅ Теперь пропсы работают!