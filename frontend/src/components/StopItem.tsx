import "./StopItem.css"
import type { Stop } from "../types/Stop"
import { formatDateTime, getOrdinal } from "../utils/FormatDateTime";

interface StopProps {
    stop: Stop;
}

export default function StopItem({ stop }: StopProps) {
    let times: string = "";
    if (stop.arrival_time !== stop.departure_time) {
        const arrivalTime = formatDateTime(stop.arrival_time);
        const departureTime = formatDateTime(stop.departure_time);
        times = 
                `${arrivalTime.month} ${arrivalTime.day}${getOrdinal(arrivalTime.day)}, ${arrivalTime.time}
                —
                ${departureTime.month} ${departureTime.day}${getOrdinal(departureTime.day)}, ${departureTime.time}`;
    }

    return (
        <div className="stop-item">
            <h3>{stop.name}</h3>
            <span>{stop.address}</span>
            <span>{stop.cost === 0 ? "" : `$${stop.cost}`}</span>
            <span>{times}</span>
        </div>
    )
}