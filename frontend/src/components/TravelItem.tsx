import "./TravelItem.css"
import type { Travel } from "../types/Travel"

interface TravelProps {
    travel: Travel;
}

export default function TravelItem({ travel }: TravelProps) {
    if (!travel.route) {
        return (
            <div className="travel-item">
                {travel.error}
            </div>
        )
    }

    return (
        <div className="travel-item">
            {travel.route.duration_seconds}s - {travel.route.distance_meters}m
        </div>
    )
}