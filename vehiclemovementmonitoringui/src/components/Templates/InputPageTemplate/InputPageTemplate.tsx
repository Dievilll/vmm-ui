import React, { useState, useEffect } from 'react';
import { LockOutlined, BarcodeOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Layout, Switch, ConfigProvider, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

interface InputPageTemplateProps {
    title?: string; // Текст заголовка
    inputPlaceholder?: string; // Текст в поле ввода
    errorMessage?: string; // Сообщение об ошибке
    minLength?: number; // Минимальная длина для авторизации
    BackButton?: boolean; // Включение/выключение кнопки возврата
    customHandleInputSubmit?: (barcode: string) => Promise<any>; // Переопределяемый метод обработки штрих-кода
    handleBackToMain?: Promise<any>;
}


interface Packet {
    
}
const InputPageTemplate: React.FC<InputPageTemplateProps> = ({
         title = 'Отсканируйте штрих-код пропуска.',
         inputPlaceholder = 'ШТРИХ-КОД',
         errorMessage = 'Введите штрих-код!',
         minLength = 10,
         BackButton = true,
         customHandleInputSubmit,
         handleBackToMain
     }) => {
    const [loading, setLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Загружаем тему из localStorage при монтировании
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
        }
    }, []);

    // Сохраняем тему в localStorage
    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    // Метод обработки штрих-кода - использует кастомный если предоставлен
    const handleInputSubmit = async (barcode: string) => {
        if (barcode.length === minLength) {
            setLoading(true);

            try {
                let userData;

                if (customHandleInputSubmit) {
                    // Используем переопределенный метод
                    userData = await customHandleInputSubmit(barcode);
                } else {
                    // Стандартная логика авторизации
                    await new Promise(resolve => setTimeout(resolve, 500)); // имитация задержки

                    userData = {
                        token: 'mock-token',
                        user: {
                            name: 'Иван',
                            surname: 'Иванов',
                            patronymic: 'Иванович'
                        }
                    };

                    // Сохраняем данные в localStorage
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('user', JSON.stringify(userData.user));
                }

                message.success('Успешный вход по штрих-коду!');

                // Вызов коллбэка при успехе
            } catch (error) {
                console.error('Ошибка авторизации:', error);

            } finally {
                setLoading(false);
            }
        }
    };

    const onValuesChange = (changedValues: any) => {
        if (changedValues.username && changedValues.username.length === minLength) {
            handleInputSubmit(changedValues.username);
        }
    };

    const toggleTheme = (checked: boolean) => {
        setIsDarkMode(checked);
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#041f97ff'
                },
            }}
        >
            <Layout className="auth-layout">
                <Content className="auth-container">
                    <div className="auth-form">
                        <div className="theme-switcher">
                            <Switch
                                checked={isDarkMode}
                                onChange={toggleTheme}
                                checkedChildren={<MoonOutlined />}
                                unCheckedChildren={<SunOutlined />}
                                className="theme-switch"
                            />
                        </div>
                        <div className='auth-info'>
                            <h2 className="auth-title">{title}</h2>
                        </div>

                        <Form
                            name="auth_form"
                            form={form}
                            onValuesChange={onValuesChange}
                            autoComplete="off"
                        >
                            <Form.Item
                                className="form-item"
                                name="username"
                                rules={[{ required: true, message: errorMessage }]}
                            >
                                <Input
                                    prefix={<BarcodeOutlined />}
                                    placeholder={inputPlaceholder}
                                    className="auth-input"
                                    autoComplete="off"
                                    autoFocus
                                    maxLength={50}
                                    size="large"
                                />
                            </Form.Item>
                        </Form>
                        {BackButton &&
                            <Button
                                type="default"
                                className="nav-button red-button"
                                onClick={handleBackToMain}
                                size="large"
                            >
                                НАЗАД
                            </Button>
                        }
                    </div>
                    
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default InputPageTemplate;