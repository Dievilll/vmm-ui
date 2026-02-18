// MonitoringPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListTemplate from "../Templates/CarListTemplate/CarListTemplate.tsx"; // Укажите правильный путь
import type { MonitoringEvent } from '../../types/GlobalTypes'; // Импортируем интерфейс

// Расширяем MonitoringEvent, чтобы он соответствовал BaseListItem
interface ExtendedMonitoringEvent extends MonitoringEvent {
    searchKey: string; // Добавляем поле, необходимое для поиска в ListTemplate
}

const MonitoringPage: React.FC = () => {
    const navigate = useNavigate();

    // Подготовим данные, добавив searchKey
    const mockEventData: ExtendedMonitoringEvent[] = [
        {
            id: 1,
            vehicleNum: 'A001AA197',
            timestamp: '01.11 12:30',
            description: 'Въезд',
            searchKey: 'A001AA197' // Используем carNumber для поиска
        },
        {
            id: 2,
            vehicleNum: 'A002AA197',
            timestamp: '01.11 12:32',
            description: 'Взвешивание 1',
            searchKey: 'A002AA197'
        },
        {
            id: 3,
            vehicleNum: 'A003AA197',
            timestamp: '01.11 12:40',
            description: 'В цех',
            searchKey: 'A003AA197'
        },
        {
            id: 4,
            vehicleNum: 'A004AA197',
            timestamp: '01.11 12:42',
            description: 'Из цеха',
            searchKey: 'A004AA197'
        },
        {
            id: 5,
            vehicleNum: 'A005AA197',
            timestamp: '01.11 12:46',
            description: 'Взвешивание 2',
            searchKey: 'A005AA197'
        }
    ];

    const handleSelect = (event: ExtendedMonitoringEvent) => {
        console.log('Выбрано событие:', event.vehicleNum, event.timestamp, event.description);
        // Навигация на CarDetailsPage, передавая carNumber
        navigate(`/monitoring/vehicle/${event.vehicleNum}`);
    };

    const handleBackClick = () => {
        navigate('/navigate');
    };

    return (
        <ListTemplate<ExtendedMonitoringEvent>
            initialData={mockEventData} // Передаем массив данных
            onItemSelect={handleSelect} // Функция для обработки клика по элементу
            onBackClick={handleBackClick} // Функция для обработки кнопки "Назад"
            placeholder="Поиск по событиям..." // Текст в поле поиска
            searchField="searchKey" // Поле, по которому искать
            renderItem={(event) => (
                <span id={"event"}>{event.vehicleNum} - {event.timestamp} - {event.description}</span>
            )}
        />
    );
};

export default MonitoringPage;