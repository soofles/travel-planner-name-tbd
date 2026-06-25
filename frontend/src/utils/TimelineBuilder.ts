import type { Stop } from "../types/Stop"
import type { Travel } from "../types/Travel";
import type { TimelineItem } from "../types/TimelineItem"

export function buildTimeline(
    stops: Stop[],
    travels: Travel[],
): TimelineItem[] {
    const timelineList: TimelineItem[] = []

    for (let i = 0; i < stops.length; i++) {
        const currStop = stops[i];
        timelineList.push({
            type: "stop",
            data: currStop,
        });

        const next = stops[i + 1];
        if (!next) break;
        const currTravel = travels[i];
        timelineList.push({
            type: "travel",
            data: currTravel,
        })
    }

    return timelineList;
}