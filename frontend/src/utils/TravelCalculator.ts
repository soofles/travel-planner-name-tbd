import type { Stop } from "../types/Stop";
import type { Travel } from "../types/Travel";
import { getRoute } from "../api/routeAPI";

export async function calculateTravels(stops: Stop[]): Promise<Travel[]> {
    const travels: Travel[] = [];

    for (let i = 0; i < stops.length - 1; i++) {
        const origin = stops[i];
        const destination = stops[i + 1];

        if (!origin.latitude || !origin.longitude || !destination.latitude || !destination.longitude) {
            travels.push({
                id: `${origin.id}-${destination.id}`,
                origin_id: origin.id,
                destination_id: destination.id,
                route: null,
                error: "Missing address for route calculation"
            })
            continue
        }
        
        travels.push({
            id: `${origin.id}-${destination.id}`,
            origin_id: origin.id,
            destination_id: destination.id,
            route: await getRoute(origin.id, destination.id),
            error: null,
        });
    }

    return travels;
}