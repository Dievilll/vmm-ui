import React, { useState, useEffect } from 'react';
import { Button, Layout, ConfigProvider, theme, Space, Flex, Typography, Checkbox, Switch, Card } from 'antd';
import { LockOutlined, UserOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductListPage.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const ProductListPage: React.FC = () => {
  const navigate = useNavigate();
  const { carNumber } = useParams<{ carNumber: string }>();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

  // Загружаем тему из localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  // Имитация загрузки данных продукции с бэкенда
  useEffect(() => {
    if (carNumber) {
      // Здесь будет реальный запрос к бэкенду
      const mockProducts = [
        { id: '25B123456', name: 'Продукция 1' },
        { id: '25B123457', name: 'Продукция 2' },
        { id: '25B123458', name: 'Продукция 3' },
        { id: '25B123459', name: 'Продукция 4' },
        { id: '25B123460', name: 'Продукция 5' },
        { id: '25B123461', name: 'Продукция 6' },
        { id: '25B123462', name: 'Продукция 7' },
        { id: '25B123463', name: 'Продукция 8' },
        { id: '25B123464', name: 'Продукция 9' },
        { id: '25B123465', name: 'Продукция 10' },
      ];
      
      setProducts(mockProducts);
    }
  }, [carNumber]);

  // Обработка изменения состояния чекбокса
  const handleCheckboxChange = (productId: string, checked: boolean) => {
    const newSelected = new Set(selectedProducts);
    if (checked) {
      newSelected.add(productId);
    } else {
      newSelected.delete(productId);
    }
    setSelectedProducts(newSelected);
  };

  // Обработка клика по продукту (переключение чекбокса)
  const handleProductClick = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const handleConfirm = () => {
    console.log('Подтверждено:', Array.from(selectedProducts));
    // Здесь будет логика подтверждения
    navigate(-1); // Возврат на предыдущую страницу
  };

  const handleBack = () => {
    navigate(-1); // Возврат на предыдущую страницу
  };

    const toggleTheme = (checked: boolean) => {
    setIsDarkMode(checked);
  };

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

            <div className="theme-switcher">
                <Switch
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  checkedChildren= {<MoonOutlined/>}
                  unCheckedChildren= {<SunOutlined />}
                  className="theme-switch"
                />
            </div>
            {/* Заголовок */}
            <Title level={2} className="product-list-title">
              Продукция для {carNumber}
            </Title>
            
            {/* Контейнер для списка продукции с отдельным скроллом */}
            <div className="product-list-container">
              <Card 
                className="list-card"
              >
                {products.map((product, index) => (
                  <Flex 
                    key={`${product.id}-${index}`} 
                    className="list-item product"
                    justify="space-between"
                    align="center"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <Text className="product-text">{product.id}</Text>
                    <Checkbox
                      checked={selectedProducts.has(product.id)}
                      onChange={(e) => handleCheckboxChange(product.id, e.target.checked)}
                      onClick={(e) => e.stopPropagation()} // Предотвращаем всплытие клика на родительский элемент
                    />
                  </Flex>
                ))}
              </Card>
            </div>
            
            {/* Кнопки внизу страницы */}
            <Space 
              orientation="vertical" 
              size="middle"
            >
              <Button 
                className="action-button"
                onClick={handleConfirm}
              >
                ПОДТВЕРДИТЬ
              </Button>
              
              <Button 
                className="red-button"
                onClick={handleBack}
              >
                НАЗАД
              </Button>
            </Space>
          </Flex>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default ProductListPage;