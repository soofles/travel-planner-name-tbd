import "./TravelItem.css"
import type { Travel } from "../types/Travel"

interface TravelProps {
    travel: Travel;
}

export default function TravelItem({ travel }: TravelProps) {
    return (
        <div className="travel-item">
            {travel.duration} min {travel.mode}
        </div>
    )
}