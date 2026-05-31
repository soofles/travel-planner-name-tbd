import type { Stop } from "../types/Stop"
import type { TimelineItem } from "../types/TimelineItem"

export function buildTimeline(
    stops: Stop[],
): TimelineItem[] {
    const timelineList: TimelineItem[] = []

    for (let i = 0; i < stops.length; i++) {
        const current = stops[i];
        timelineList.push({
            type: "stop",
            data: current,
        });

        const next = stops[i + 1];
        if (!next) break;
        timelineList.push({
            type: "travel",
            data: {
                id: `${stops[i].id}-${next.id}`,
                originId: stops[i].id,
                destId: next.id,
                duration: Math.floor(Math.random() * 20) + 5,
                mode: "drive"
            }
        })
    }

    return timelineList;
}