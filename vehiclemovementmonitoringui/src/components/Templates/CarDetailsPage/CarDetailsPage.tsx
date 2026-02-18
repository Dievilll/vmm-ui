import React, {useState, useEffect, JSX} from 'react';
import {Button, Layout, ConfigProvider, theme, Space, Flex, Typography, Divider} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';
import CarDetailCard from "../CarDetailCard/CarDetailCard.tsx"; // Импортируем обновленный компонент
import './CarDetailsPage.css';
import type {CarItem} from "../../../types/GlobalTypes";

const {Content} = Layout;
const {Text} = Typography;

interface CarDetailsPageProps {
    source?: string; // Параметр, определяющий источник (workshop, entry, etc.)
}

// Тип для определения навигации и кнопок
interface SourceConfig {
    route: string;
    additionalButtons: JSX.Element | null;
}

// Функция для получения кнопок, передаем navigate для обработки навигации внутри
const getAdditionalButtons = (source: string, carNumber: string | undefined, navigate: ReturnType<typeof useNavigate>): SourceConfig['additionalButtons'] => {
    switch (source) {
        case 'entry':
            return (
                <Button
                    className="action-button"
                    onClick={() => {
                        // Пример вызова к бэкенду для действия "ПРОПУСТИТЬ" на вкладке entry
                        // fetch(`${API_BASE_URL}/entry/${carNumber}/pass`, {
                        //   method: 'POST',
                        //   headers: {
                        //     'Content-Type': 'application/json',
                        //     // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        //   },
                        // })
                        // .then(response => {
                        //   if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                        //   // Обработка успешного ответа, например, навигация
                        //   navigate('/entry');
                        // })
                        // .catch(err => {
                        //   console.error("Ошибка при пропуске на входе:", err);
                        //   // setError(err.message); // Устанавливаем ошибку
                        // });

                        console.log('КПП ВЪЕЗД: Пропустить')
                    }}
                >
                    ПРОПУСТИТЬ
                </Button>
            );
        case 'workshop':
            return (
                <>
                    <Button
                        className="action-button"
                        onClick={() => {
                            // Пример вызова к бэкенду для действия "ОФОРМЛЕНИЕ" на вкладке workshop
                            // fetch(`${API_BASE_URL}/workshop/${carNumber}/confirm`, {
                            //   method: 'POST',
                            //   headers: {
                            //     'Content-Type': 'application/json',
                            //     // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                            //   },
                            // })
                            // .then(response => {
                            //   if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                            //   // Обработка успешного ответа
                            //   navigate('/workshop');
                            // })
                            // .catch(err => {
                            //   console.error("Ошибка при оформлении СТО:", err);
                            //   // setError(err.message);
                            // });
                            console.log('ЦЕХ: Оформление')
                        }}
                    >
                        ОФОРМЛЕНИЕ
                    </Button>
                </>
            );
        case 'exit':
            return (
                <>
                    <Button
                        className="action-button"
                        onClick={() => {
                            // Пример вызова к бэкенду для действия "ПРОВЕРИТЬ" на вкладке exit
                            // fetch(`${API_BASE_URL}/exit/${carNumber}/check`, {
                            //   method: 'POST',
                            //   headers: {
                            //     'Content-Type': 'application/json',
                            //     // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                            //   },
                            // })
                            // .then(response => {
                            //   if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                            //   // Обработка успешного ответа
                            //   // navigate(`/exit/vehicle/scaning/${carNumber}`); // Если навигация после проверки
                            //   console.log('ДОСТАВКА: Проверка выполнена');
                            // })
                            // .catch(err => {
                            //   console.error("Ошибка при проверке на выходе:", err);
                            //   // setError(err.message);
                            // });

                            if (carNumber) {
                                navigate(`/exit/vehicle/scaning/${carNumber}`);
                            }
                            console.log('КПП ВЫЕЗД: Проверить');
                        }}
                    >
                        ПРОВЕРИТЬ
                    </Button>
                    <Button
                        className="action-button"
                        onClick={() => {
                            // Пример вызова к бэкенду для действия "ПРОПУСТИТЬ" на вкладке exit
                            // fetch(`${API_BASE_URL}/exit/${carNumber}/pass`, {
                            //   method: 'POST',
                            //   headers: {
                            //     'Content-Type': 'application/json',
                            //     // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                            //   },
                            // })
                            // .then(response => {
                            //   if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                            //   // Обработка успешного ответа
                            //   navigate('/exit');
                            // })
                            // .catch(err => {
                            //   console.error("Ошибка при пропуске на выходе:", err);
                            //   // setError(err.message);
                            // });
                            console.log('КПП ВЫЕЗД: Отклонить')
                        }}
                    >
                        ПРОПУСТИТЬ
                    </Button>
                </>
            );
        default:
            return null;
    }
};

const CarDetailsPage: React.FC<CarDetailsPageProps> = ({source = 'default'}) => {
    const navigate = useNavigate();
    const {carNumber} = useParams<{ carNumber: string }>();
    const [isDarkMode, setIsDarkMode] = useState(false); // Состояние темы
    const [carDetails, setCarDetails] = useState<any>(null);

    // Загружаем тему из localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
        }
    }, []);

    // Имитация загрузки данных автомобиля с бэкенда
    useEffect(() => {
        if (carNumber) {
            // Пример вызова к бэкенду для получения деталей автомобиля
            // fetch(`${API_BASE_URL}/cars/${carNumber}?source=${source}`, {
            //   method: 'GET',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            //   },
            // })
            // .then(response => {
            //   if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            //   }
            //   return response.json();
            // })
            // .then(data => {
            //   setCarDetails(data); // Предполагается, что бэкенд возвращает объект с нужной структурой
            // })
            // .catch(error => {
            //   console.error("Ошибка при получении данных автомобиля:", error);
            //   // setError(error.message);
            //   // setCarDetails(null); // Или оставить предыдущее состояние, или показать сообщение
            // });

            // Здесь будет реальный запрос к бэкенду
            let mockCarDetails: CarItem = {
                vehicleNum: carNumber,
                trailerNum: 'EK771252',
                deliveries:[
                    {
                        deliveryId: 240008142,
                        positions: [
                            {
                                productionDesc: "Круг МД1 18х6000 ГОСТ 2590-2006 / 40Х ГОСТ 4543-2016",
                                tolerance: 25,
                                theorWeight: 2.468,
                                factWeight: 2.457,
                            },
                            {
                                productionDesc: "Круг МД1 30х6000 ГОСТ 2590-2006 / 18ХГТ ГОСТ 4543-2016",
                                tolerance: 10,
                                theorWeight: 11.402,
                                factWeight: 11.471,
                            },
                            {
                                productionDesc: "Круг МД1 40х6000 ГОСТ 2590-2006 / 20 ГОСТ 1050-2013",
                                tolerance: 20,
                                theorWeight: 19.89,
                                factWeight: 19.897,
                            },
                            {
                                productionDesc: "Круг МД1 25х6000 ГОСТ 2590-2006 / 35 ГОСТ 1050-2013",
                                tolerance: 10,
                                theorWeight: 1.668,
                                factWeight: 1.657,
                            },
                            {
                                productionDesc: "Круг МД1 25х6000 ГОСТ 2590-2006 / 20 ГОСТ 1050-2013",
                                tolerance: 20,
                                theorWeight: 2.365,
                                factWeight: 2.384,
                            }
                        ],
                    },
                    {
                        deliveryId: 240008143,
                        positions: [
                            {
                                productionDesc: "Круг МД1 18х6000 ГОСТ 2590-2006 / 40Х ГОСТ 4543-2016",
                                tolerance: 25,
                                theorWeight: 2.468,
                                factWeight: 2.457,
                            },
                            {
                                productionDesc: "Круг МД1 30х6000 ГОСТ 2590-2006 / 18ХГТ ГОСТ 4543-2016",
                                tolerance: 10,
                                theorWeight: 11.402,
                                factWeight: 11.471,
                            },
                            {
                                productionDesc: "Круг МД1 40х6000 ГОСТ 2590-2006 / 20 ГОСТ 1050-2013",
                                tolerance: 20,
                                theorWeight: 19.89,
                                factWeight: 19.897,
                            },
                            {
                                productionDesc: "Круг МД1 25х6000 ГОСТ 2590-2006 / 35 ГОСТ 1050-2013",
                                tolerance: 10,
                                theorWeight: 1.668,
                                factWeight: 1.657,
                            },
                            {
                                productionDesc: "Круг МД1 25х6000 ГОСТ 2590-2006 / 20 ГОСТ 1050-2013",
                                tolerance: 20,
                                theorWeight: 2.365,
                                factWeight: 2.384,
                            }
                        ],
                    }
                ]
            };

            // Добавляем уникальные поля в зависимости от source
            switch (source) {
                case 'workshop':
                case 'monitoring':
                    mockCarDetails = {...mockCarDetails, statusWorkshop:"Цех", supplier: "ТД ТУЛА-СТАЛЬ ООО", 
                        contragent:"МЕТАЛЛ ПРОЕКТ ООО", warehouse:"ПЦ Участок адъюстажа и отгрузки ГП (произв)"};
                    break;
            }

            setCarDetails(mockCarDetails);
        }
    }, [carNumber, source]);

    const handleBack = () => {
        let targetRoute = '/navigate';
        switch (source) {
            case 'workshop':
                targetRoute = '/workshop';
                break;
            case 'entry':
                targetRoute = '/entry';
                break;
            case 'exit':
                targetRoute = '/exit';
                break;
            case 'monitoring':
                targetRoute = '/monitoring';
                break;
            default:
                targetRoute = '/navigate';
        }
        navigate(targetRoute);
    };

    if (!carDetails) {
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
                <Layout className={`navigate-layout ${isDarkMode ? 'dark-theme' : ''}`}>
                    <Content className="navigate-container">
                        <Flex vertical gap="middle" className="car-details-flex" align="center" justify="center">
                            <Text>Загрузка...</Text>
                        </Flex>
                    </Content>
                </Layout>
            </ConfigProvider>
        );
    }
    
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
            <Layout className='navigate-layout'>
                <Content className="navigate-container">
                    <Flex vertical gap="middle" className="entry-flex">
                        {/* Передаем source в CarDetailCard */}
                        <CarDetailCard details={carDetails} source={source}/>

                        {/* Кнопки внизу страницы */}
                        <Space orientation="vertical" size="middle">
                            {/* Дополнительные кнопки в зависимости от источника */}
                            {getAdditionalButtons(source, carNumber, navigate)}
                            <Button className="red-button" onClick={handleBack}>
                                НАЗАД
                            </Button>
                        </Space>
                    </Flex>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default CarDetailsPage;