import { api } from "./client"
import type { Route } from "../types/Route"

export async function getRoute(
    origin_id: number,
    destination_id: number,
): Promise<Route> {
    return api<Route>(`/stops/routes/${origin_id}/${destination_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}