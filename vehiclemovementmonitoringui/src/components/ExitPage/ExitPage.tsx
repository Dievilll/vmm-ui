import React from 'react';
import { useNavigate } from 'react-router-dom';
import CarListTemplate from "../Templates/CarListTemplate/CarListTemplate";
import type {CarItem} from "../../types/GlobalTypes";

const ExitPage: React.FC = () => {
  const navigate = useNavigate();

  const mockCarData: CarItem[] =[
    { vehicleNum: 'A001AA197' },
    { vehicleNum: 'A002AA197' },
    { vehicleNum: 'B001BB197' },
  ]
  const handleSelect = (car) => {
    console.log('Выбран автомобиль:', car.vehicleNum);
    navigate(`/exit/vehicle/${car.vehicleNum}`);
  };

  const handleBackClick = () => {
    navigate('/navigate');
  };

  return (
    <CarListTemplate
        initialData={mockCarData}
        onItemSelect={handleSelect}
        onBackClick={handleBackClick}
        placeholder="Поиск по номеру..."
        searchField="vehicleNum"
        renderItem={(car) => (
            <span>{car.vehicleNum}</span>
        )}
    />
  );
};

export default ExitPage;