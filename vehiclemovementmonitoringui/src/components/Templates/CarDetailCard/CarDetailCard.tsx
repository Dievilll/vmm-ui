import React from 'react';
import { Space, Flex, Typography, Card, Divider, List } from 'antd';
import type { CarItem } from "../../../types/GlobalTypes.ts"; // Убедитесь, что путь правильный
import DeliveryTable from "../DeliveryTable/DeliveryTable.tsx"; // Импортируем новый компонент

const { Text } = Typography;

interface CarDetailCardProps {
    details: CarItem; // Теперь типизировано как CarItem
    source: string; // Передаем source для определения уникальных полей
}

// Функция для отображения уникальных полей в зависимости от source
const renderUniqueFields = (details: CarItem, source: string) => {
    // Проверяем, есть ли доставки
    if (!details.deliveries || !Array.isArray(details.deliveries)) {
        return null; // Или рендерим сообщение о том, что данных нет
    }

    switch (source) {
        case 'entry':
            return (
                <>
                    <List
                        header={<Text style={{padding:"2px"}} strong className="label">Список РО:</Text>}
                        dataSource={details.deliveries}
                        renderItem={(delivery) => (
                            <List.Item>
                                <Text>{delivery.deliveryId}</Text>
                            </List.Item>
                        )}
                        size="small"
                    />
                </>
            );
        case 'workshop':
        case 'monitoring':
            // Пример логики для workshop - может отображать общую информацию или информацию по первой доставке
            // или вообще ничего. Уточните, что именно нужно отображать.
            // Пока просто возвращаем null или добавьте нужные поля.
            return (
                <>
                    <Divider />
                    <Flex justify="space-between" className="detail-row">
                        <Text strong className="label">Поставщик:</Text>
                        <Text className="value">{details.supplier || 'N/A'}</Text> {/* Добавьте supplier в CarItem если нужно */}
                    </Flex>
                    <Flex justify="space-between" className="detail-row">
                        <Text strong className="label">Контрагент:</Text>
                        <Text className="value">{details.contragent || 'N/A'}</Text> {/* Добавьте contragent в CarItem если нужно */}
                    </Flex>
                    <Flex justify="space-between" className="detail-row">
                        <Text strong className="label">Склад:</Text>
                        <Text className="value">{details.warehouse || 'N/A'}</Text> {/* Добавьте warehouse в CarItem если нужно */}
                    </Flex>
                </>
            );

        case 'exit':
            // Рендерим компонент DeliveryTable для каждой доставки
            return details.deliveries.map((delivery, index) => (
                <DeliveryTable key={`delivery-${delivery.deliveryId}-${index}`} delivery={delivery} index={index} />
            ));

        // Добавьте другие case при необходимости
        default:
            return null;
    }
};

const CarDetailCard: React.FC<CarDetailCardProps> = ({ details, source }) => {
    console.log(details);
    return (
        <Card className="car-details-card">
            <Space orientation="vertical" size={4}>
                {/* Общие поля для всех источников */}
                <Flex justify="space-between" className="detail-row">
                    <Text strong className="label">А/М:</Text>
                    <Text className="value">{details.vehicleNum}</Text>
                </Flex>
                <Flex justify="space-between" className="detail-row">
                    <Text strong className="label">Прицеп:</Text>
                    <Text className="value">{details.trailerNum}</Text>
                </Flex>

                {/* Уникальные поля в зависимости от source */}
                {renderUniqueFields(details, source)}
            </Space>
        </Card>
    );
};

export default CarDetailCard;