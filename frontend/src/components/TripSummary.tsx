import type { Trip } from "../types/Trip"
import type { TripRequest } from "../api/tripAPI";
import type { Stop } from "../types/Stop"
import type { Travel } from "../types/Travel";

interface TripSummaryProps {
    trip: Trip;
    stops: Stop[];
    travels: Travel[];
    onUpdateTrip: (id: number, input: TripRequest) => void;
}

export default function TripSummary({
    trip,
    stops,
    travels,
    onUpdateTrip,
}: TripSummaryProps) {
    return (
        <div className="trip-summary">
            <div className="trip-score">
                <span>Trip Score</span>
                <span>X / 100</span>
            </div>
            <div className="trip-message">
                <span>Trip message here!</span>
            </div>
            <div className="planning-summary">
                <div className="planning-score">
                    <span>Planning</span>
                    <span>X / 100</span>
                </div>
                <div className="planning-details">
                    <ul>
                        <li>Bullet 1</li>
                        <li>Bullet 2</li>
                        <li>Bullet 3</li>
                    </ul>
                </div>
            </div>
            <div className="budgeting-summary">
                <div className="budgeting-score">
                    <span>Budgeting</span>
                    <span>X / 100</span>
                </div>
                <div className="budgeting-details">
                    <ul>
                        <li>Bullet 1</li>
                        <li>Bullet 2</li>
                        <li>Bullet 3</li>
                    </ul>
                </div>
            </div>
            <div className="completeness-summary">
                <div className="completeness-score">
                    <span>Completeness</span>
                    <span>X / 100</span>
                </div>
                <div className="completeness-details">
                    <ul>
                        <li>Bullet 1</li>
                        <li>Bullet 2</li>
                        <li>Bullet 3</li>
                    </ul>
                </div>
            </div>
            <div className="trip-analytics">
                <div className="cost-estimate">
                    <span>Estimated Cost</span>
                    <span>{trip.budget}</span>
                </div>
                <div className="distance-estimate">
                    <span>Distance Traveled</span>
                    <span>X</span>
                </div>
                <div className="stop-count">
                    <span>Stops</span>
                    <span>{stops.length}</span>
                </div>
            </div>
        </div>
    )
}