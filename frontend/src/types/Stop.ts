export interface Stop {
    id: number;
    name: string;
    category: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    cost: number;
    timeZone: string;
    arrivalTime: string;
    departureTime: string;
}