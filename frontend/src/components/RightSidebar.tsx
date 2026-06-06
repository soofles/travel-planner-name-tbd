import type { Stop } from "../types/Stop"
import type { StopRequest } from "../api/stopAPI"

interface RightSidebarProps {
    stop: Stop | null;
    onUpdateStop: (id: number, input: StopRequest) => void;
    onDeleteStop: (id: number) => void;
}

export default function RightSidebar({
    stop,
    onUpdateStop,
    onDeleteStop,
}: RightSidebarProps) {
    if (!stop) {
        return
    }

    return (
        <aside className="right-sidebar">
            <h2>{stop.name}</h2>
            <p>{stop.category} - {stop.cost}</p>
            <p>{stop.arrival_time} - {stop.departure_time}</p>
            <p>{stop.address}</p>
            <p>{stop.description}</p>
            <button onClick={() => {onDeleteStop(stop.id)}}>Delete Stop</button>
        </aside>
    )
}