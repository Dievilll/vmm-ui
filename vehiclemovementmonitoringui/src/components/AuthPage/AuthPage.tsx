import React, { useState, useEffect } from 'react';
import { LockOutlined, UserOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Layout, Switch, ConfigProvider, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const { Content } = Layout;

const AuthPage: React.FC = () => {
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

  const handleBarcodeSubmit = (barcode: string) => {
    if (barcode.length === 10) {
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('user', JSON.stringify({
          name: 'Иван',
          surname: 'Иванов',
          patronymic: 'Иванович'
        }));
        message.success('Успешный вход по штрих-коду!');
        navigate('/dashboard');
        setLoading(false);
      }, 500);
    }
  };

  const onValuesChange = (changedValues: any) => {
    if (changedValues.username && changedValues.username.length === 10) {
      handleBarcodeSubmit(changedValues.username);
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
                  checkedChildren= {<MoonOutlined/>}
                  unCheckedChildren= {<SunOutlined />}
                  className="theme-switch"
                />
            </div>
            <div className='auth-info'>
              <h2 className="auth-title">Отсканируйте штрих-код пропуска.</h2>
            </div>
            
            <Form
              name="auth_form"
              form={form}
              onValuesChange={onValuesChange}
              autoComplete="off"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Введите штрих-код!' }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="ШТРИХ-КОД" 
                  className="auth-input"
                  autoComplete="off"
                  autoFocus
                  maxLength={50}
                  size="large"
                />
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default AuthPage;