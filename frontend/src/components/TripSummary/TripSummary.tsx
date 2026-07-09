import "./TripSummary.css"
import type { Trip } from "../../types/Trip"
import type { TripRequest } from "../../api/tripAPI"
import type { Stop } from "../../types/Stop"
import type { Travel } from "../../types/Travel"
// import { getTripScore } from "../utils/ScoringAlgorithm"

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
}: TripSummaryProps) {
    // const scores = getTripScore(stops, travels, trip.budget);
    
    const totalCost = stops.reduce((sum, stop) => sum + stop.cost, 0);

    const totalDistance = travels.reduce((sum, travel) => sum + (travel.route === null ? 0 : travel.route.distance_meters), 0) / 1609;
    const totalDistRounded = totalDistance.toFixed(2);
    
    const totalTimeSeconds = travels.reduce((sum, travel) => sum + (travel.route === null ? 0 : travel.route.duration_seconds), 0);
    const totalTimeMinutes = totalTimeSeconds / 60;
    const totalTimeRemainder = (totalTimeSeconds % 60).toString().padStart(2, "0");
    return (
        <div className="trip-summary">
            {/*<div className="trip-score">
                <span>Trip Score</span>
                <span>{scores.overallScore} / 100</span>
            </div>
            <div className="trip-message">
                <span>Trip message here!</span>
            </div>
            <div className="planning-summary">
                <div className="planning-score">
                    <span>Planning</span>
                    <span>{scores.planningScore} / 100</span>
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
                    <span>{scores.budgetingScore} / 100</span>
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
                    <span>{scores.completenessScore} / 100</span>
                </div>
                <div className="completeness-details">
                    <ul>
                        <li>Bullet 1</li>
                        <li>Bullet 2</li>
                        <li>Bullet 3</li>
                    </ul>
                </div>
            </div>*/}
            <div className="trip-analytics">
                <div className="trip-stat">
                    <span>Stops</span>
                    <span>{stops.length}</span>
                </div>
                <div className="trip-stat">
                    <span>Estimated Cost</span>
                    <span>{totalCost}</span>
                </div>
                <div className="trip-stat">
                    <span>Initial Budget vs Estimated Cost</span>
                    <span>{trip.budget - totalCost}</span>
                </div>
                <div className="trip-stat">
                    <span>Distance Traveled</span>
                    <span>{totalDistRounded}</span>
                </div>
                <div className="trip-stat">
                    <span>Estimated Time Traveling</span>
                    <span>{totalTimeMinutes}:{totalTimeRemainder}</span>
                </div>
            </div>
        </div>
    )
}