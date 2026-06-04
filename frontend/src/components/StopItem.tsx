import "./StopItem.css"
import type { Stop } from "../types/Stop"

interface StopProps {
    stop: Stop;
}

export default function StopItem({ stop }: StopProps) {
    return (
        <div className="stop-item">
            <h3>{stop.name}</h3>
            <p>{stop.address}</p>
            <div>${stop.cost}</div>
            <div>{stop.arrivalTime} - {stop.departureTime}</div>
        </div>
    )
}