import React from 'react';
import { useNavigate } from 'react-router-dom';
import CarListTemplate from "../Templates/CarListTemplate/CarListTemplate.tsx";
import type {CarItem} from "../../types/GlobalTypes.ts";

const WorkshopPage: React.FC = () => {
  const navigate = useNavigate();

  const mockCarData: CarItem[] = [
    { vehicleNum: 'A001AA197' },
    { vehicleNum: 'A002AA197' },
    { vehicleNum: 'B001BB197' },
  ]
  const handleSelect = (car) => {
    console.log('Выбран автомобиль на СТО:', car.vehicleNum);
    navigate(`/workshop/vehicle/${car.vehicleNum}`);
  };

  const handleBackClick = () => {
    navigate('/navigate');
  };

  return (
    <CarListTemplate<CarItem>
        initialData={mockCarData} // Передаем массив данных
        onItemSelect={handleSelect} // Функция для обработки клика по элементу
        onBackClick={handleBackClick} // Функция для обработки кнопки "Назад"
        placeholder="Поиск по номеру..." // Текст в поле поиска
        searchField="vehicleNum"
        renderItem={(car) => (
            <span>{car.vehicleNum}</span>
        )}
    />
  );
};

export default WorkshopPage;