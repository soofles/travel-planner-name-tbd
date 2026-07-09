import "./TravelItem.css"
import type { Travel } from "../../types/Travel"

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

    const minutes = Math.floor(travel.route.duration_seconds / 60);
    const rem_seconds = travel.route.duration_seconds % 60;
    const padded = rem_seconds.toString().padStart(2, '0');

    const miles = travel.route.distance_meters / 1609
    const miles_rounded = miles.toFixed(2)

    return (
        <div className="travel-item">
            {`${minutes}:${padded}`} driving - {miles_rounded} miles
        </div>
    )
}