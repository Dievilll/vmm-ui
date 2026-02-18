import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarListTemplate from "../Templates/CarListTemplate/CarListTemplate.tsx";
import type { CarItem } from '../../types/GlobalTypes';
import { fetchCarList } from '../../api/carApi.ts';

const EntryPage: React.FC = () => {
  const navigate = useNavigate();
  const [carList, setCarList] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных при монтировании
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        const data = [
          { vehicleNum: 'A001AA197', trailerNum: '', deliveries: [] },
          { vehicleNum: 'A002AA197', trailerNum: '', deliveries: [] },
          { vehicleNum: 'B001BB197', trailerNum: '', deliveries: [] },
        ];
        setCarList(data);
      } catch (err) {
        console.error('Ошибка загрузки списка КПП ВЪЕЗД:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        // Для разработки: используем моки при ошибке
        if (import.meta.env.DEV) {
          setCarList([
            { vehicleNum: 'A001AA197', trailerNum: '', deliveries: [] },
            { vehicleNum: 'A002AA197', trailerNum: '', deliveries: [] },
            { vehicleNum: 'B001BB197', trailerNum: '', deliveries: [] },
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const handleBackClick = () => navigate('/navigate');
  const handleSelect = (car: CarItem) => {
    console.log('Выбран автомобиль на КПП ВЪЕЗД:', car.vehicleNum);
    navigate(`/entry/vehicle/${car.vehicleNum}`);
  };

  return (
      <CarListTemplate
          initialData={carList}
          loading={loading} // ← Передаём состояние загрузки
          error={error}
          onItemSelect={handleSelect}
          onBackClick={handleBackClick}
          placeholder="Поиск по номеру КПП ВЪЕЗД..."
          searchField="vehicleNum"
          renderItem={(car) => (
          <span>
            {car.vehicleNum}
          </span>
          )}
      />
  );
};

export default EntryPage;