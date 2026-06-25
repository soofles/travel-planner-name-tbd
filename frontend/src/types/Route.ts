export interface Route {
    id: number;
    origin_lat: number;
    origin_lon: number;
    destination_lat: number;
    destination_lon: number;
    distance_meters: number;
    duration_seconds: number;
    profile: string;
}