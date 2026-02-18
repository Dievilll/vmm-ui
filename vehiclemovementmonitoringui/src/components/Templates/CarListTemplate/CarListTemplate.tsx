import React, { useState, useEffect } from 'react';
import {
  Button, Layout, ConfigProvider, theme, Input, Space, Flex, Typography, Card,
  Spin, Empty, Result
} from 'antd';
import { useNavigate } from 'react-router-dom';
import './CarListTemplate.css';
import ErrorPage from "../../ErrorPage/ErrorPage";
import type {CarItem} from "../../../types/GlobalTypes.ts";

const { Content } = Layout;
const { Search } = Input;
const { Text } = Typography;

// --- Интерфейс для пропсов ---
interface ListTemplateProps<T> {
  initialData: T[];
  loading?: boolean;
  error?: string | null;
  onItemSelect: (item: T) => void; // Обработчик выбора элемента
  onBackClick: () => void; // Обработчик кнопки "НАЗАД"
  placeholder?: string; // Текст в поле поиска
  renderItem: (item: T) => React.ReactNode; // Функция для рендеринга каждого элемента (обязательна)
  searchField?: keyof T; // Поле, по которому производится поиск (обязательно, если используется поиск)
  isDarkModeOverride?: boolean; // Возможность принудительно задать тему извне
}

// --- Компонент ---
const ListTemplate = <T,>({
                            initialData, // Обязательный параметр
                            loading = false, // Состояние загрузки (передаётся извне)
                            error = null, // Состояние ошибки (передаётся извне)
                            onItemSelect,
                            onBackClick,
                            placeholder = 'Поиск...',
                            renderItem,
                            searchField, // Может быть undefined, тогда поиск отключен
                            isDarkModeOverride
                          }: ListTemplateProps<T>) => {
  const [isDarkModeState, setIsDarkModeState] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Используем initialData как начальное состояние для data
  const [data, setData] = useState<T[]>(initialData);
  const [filteredData, setFilteredData] = useState<T[]>(initialData);
  // Определяем режим темы: сначала проверяем override, затем localStorage
  const effectiveIsDarkMode = isDarkModeOverride ?? isDarkModeState;

  // Загружаем тему из localStorage, если override не задан
  useEffect(() => {
    if (isDarkModeOverride === undefined) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setIsDarkModeState(true);
      }
    }
  }, [isDarkModeOverride]);

  // Обновляем data и filteredData при изменении initialData (например, после загрузки)
  useEffect(() => {
    setData(initialData);
    setFilteredData(initialData);
  }, [initialData]); // Зависимость от initialData

  // Фильтрация данных при изменении поиска ИЛИ при изменении исходных данных
  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredData(data);
    } else if (searchField) { // Проверяем, что searchField определён
      setFilteredData(
          data.filter(item =>
              String(item[searchField]).toLowerCase().includes(searchValue.toLowerCase())
          )
      );
    } else {
      setFilteredData(data);
    }
  }, [searchValue, data, searchField]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
      <ConfigProvider
          theme={{
            algorithm: effectiveIsDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: {
              colorPrimary: '#0066ff',
              borderRadius: 8,
              fontSize: 16,
            },
          }}
      >
        <Layout className="navigate-layout">
          <Content className="navigate-container">
            <Flex vertical className="entry-flex">
              {/* Поле поиска */}
              <Search
                  placeholder={placeholder}
                  allowClear
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  onSearch={handleSearch}
                  className="search-input"
                  disabled={loading} // Отключаем при загрузке
              />

              {/* Состояние ошибки */}
              {error && !loading && (
                  <ErrorPage
                      errorCode="404"
                      errorMessage="Ошибка загрузки данных"
                      errorDescription=""
                      showHomeButton={true}
                      showBackButton={true}
                  />
              )}

              {/* Список данных (только если нет ошибки и не загружается) */}
              {!error && !loading && (
                  <>
                      <div className="car-list-container">
                          <Card className="list-card">
                              {filteredData.length > 0 ? (
                                  filteredData.map((item, index) => (
                                      <div
                                          key={`${searchField ? String(item[searchField]) : index}-${index}`} // Безопасное создание ключа
                                          className="list-item"
                                          onClick={() => onItemSelect(item)} // Передаем весь объект item
                                      >
                                          {renderItem(item)} {/* Вызываем обязательную функцию рендеринга */}
                                      </div>
                                  ))
                              ) : searchValue.trim() !== '' ? (
                                  <div className="no-results">Не найдено</div>
                              ) : (
                                  <Empty description="Нет данных" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                              )}
                          </Card>
                      </div>

                      <Button
                          type="default"
                          className="nav-button red-button"
                          onClick={onBackClick}
                          size="large"
                          disabled={loading} // Отключаем кнопку назад при загрузке
                      >
                          НАЗАД
                      </Button>
                  </>
              )}
            </Flex>
          </Content>
        </Layout>
      </ConfigProvider>
  );
};

export default ListTemplate;