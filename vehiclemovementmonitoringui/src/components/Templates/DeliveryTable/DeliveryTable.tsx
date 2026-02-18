import React from 'react';
import { Table, Typography } from 'antd';
import type { Delivery, Position } from "../../../types/GlobalTypes.ts"; // Убедитесь, что путь правильный

const { Text } = Typography;

interface DeliveryTableProps {
    delivery: Delivery; // Принимаем одну доставку
    index: number; // Индекс для генерации уникального ключа
}

// Определяем столбцы таблицы (можно вынести на уровень выше, если они универсальны)
const positionColumns = [
    {
        title: 'Продукция',
        dataIndex: 'productionDesc',
        key: 'productionDesc',
    },
    {
        title: 'Толеранс',
        dataIndex: 'tolerance',
        key: 'tolerance',
    },
    {
        title: 'Теор. вес',
        dataIndex: 'theorWeight',
        key: 'theorWeight',
    },
    {
        title: 'Факт. вес',
        dataIndex: 'factWeight',
        key: 'factWeight',
    },
];

const DeliveryTable: React.FC<DeliveryTableProps> = ({ delivery, index }) => {
    const tableDataSource = delivery.positions.map((pos: Position, posIndex: number) => ({
        key: `${delivery.deliveryId}-${posIndex}`, // Уникальный ключ для строки
        ...pos // Распаковываем поля Position
    }));

    // Функция для заголовка таблицы
    const tableTitle = () => {
        return (
            <div style={{ textAlign: "center" }}>
                <Text strong className="label">РО: {delivery.deliveryId}</Text>
            </div>
        );
    };

    // Оборачиваем Table в div, если нужно задать внешние стили
    return (
        <Table
            title={tableTitle}
            bordered={true}
            pagination={false}
            dataSource={tableDataSource}
            columns={positionColumns}
            key={`delivery-table-${delivery.deliveryId}-${index}`} // Уникальный ключ для компонента
        />
    );
};

export default DeliveryTable;