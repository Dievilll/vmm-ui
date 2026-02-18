export interface CarItem {
    vehicleNum: string; // Конкретное поле с номером автомобиля
    trailerNum: string;
    deliveries: Delivery[]
}

export interface Delivery{
    deliveryId: number;
    positions: Position[];
}

export interface Position{
    productionDesc: string;
    tolerance: number;
    theorWeight: number;
    factWeight: number;
}

export interface MonitoringEvent {
    id: number;
    vehicleNum: string;
    timestamp: string;
    description: string;
}

