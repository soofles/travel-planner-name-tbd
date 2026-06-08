import "./StopItem.css"
import type { Stop } from "../types/Stop"

interface StopProps {
    stop: Stop;
}

export default function StopItem({ stop }: StopProps) {
    return (
        <div className="stop-item">
            <h3>{stop.name}</h3>
            <span>{stop.address}</span>
            <span>${stop.cost}</span>
            <span>{stop.arrival_time} - {stop.departure_time}</span>
        </div>
    )
}