import type { CarItem } from '../types/GlobalTypes';

const API_BASE_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL || '/api';

/**
 * Получение списка автомобилей для источника (entry/exit/workshop/monitoring)
 */
export const fetchCarList = async (source: string): Promise<CarItem[]> => {
    const response = await fetch(`${API_BASE_URL}/${source}/vehicles`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(error.message || `Ошибка ${response.status}`);
    }

    return response.json() as Promise<CarItem[]>; // Типизация строго под ваш CarItem
};

/**
 * Получение деталей автомобиля (уже есть в CarDetailsPage, но выносим для переиспользования)
 */
export const fetchCarDetails = async (
    carNumber: string,
    source: string
): Promise<CarItem> => {
    const response = await fetch(
        `${API_BASE_URL}/cars/${encodeURIComponent(carNumber)}?source=${source}`,
        { headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.ok) throw new Error(`Ошибка ${response.status}`);
    return response.json() as Promise<CarItem>;
};