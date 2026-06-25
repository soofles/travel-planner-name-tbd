import type { Route } from "./Route"

export interface Travel {
    id: string;
    origin_id: number;
    destination_id: number;
    route: Route | null;
    error: string | null;
}