import type { Stop } from "./Stop"
import type { Travel } from "./Travel"

export type TimelineItem =
    | { type: "stop"; data: Stop }
    | { type: "travel"; data: Travel }