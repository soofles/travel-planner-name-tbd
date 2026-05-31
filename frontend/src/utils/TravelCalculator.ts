import type { Stop } from "../types/Stop";
import type { Travel } from "../types/Travel";

export function calculateTravel(stops: Stop[]): Travel[] {
    const travels: Travel[] = [];

    for (let i = 0; i < stops.length - 1; i++) {
        const origin = stops[i];
        const dest = stops[i + 1];

        travels.push({
            id: `${origin.id}-${dest.id}`,
            originId: origin.id,
            destId: dest.id,
            duration: Math.floor(Math.random() * 20) + 5,
            mode: "drive"
        });
    }

    return travels;
}