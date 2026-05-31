import type { Stop } from "../types/Stop"
import type { Travel } from "../types/Travel"
import type { TimelineItem } from "../types/TimelineItem"

export function buildTimeline(
    stops: Stop[],
    travels: Travel[],
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
        const travel = travels.find((t) =>
            t.fromId === current.id && t.toId === next.id
        );
        if (travel) {
            timelineList.push({
                type: "travel",
                data: travel,
            });
        };
    }

    return timelineList;
}