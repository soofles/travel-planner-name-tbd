import "./CenterTimeline.css"
import { useState, useEffect } from "react"
import { buildTimeline } from "../utils/TimelineBuilder"
import type { DragEndEvent } from "@dnd-kit/core"
import type { Trip } from "../types/Trip"
import type { Stop } from "../types/Stop"
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableStopItem from "./SortableStopItem"
import TravelItem from "./TravelItem"

interface CenterTimelineProps {
    trip: Trip | null;
    stops: Stop[];
    onSelectStop: (id: number) => void;
    onCreateStop: () => void;
    onDeleteStop: (id: number) => void;
    onDragEnd: (e: DragEndEvent) => void;
}

export default function CenterTimeline({
    trip,
    stops,
    onSelectStop,
    onCreateStop,
    onDeleteStop,
    onDragEnd,
}: CenterTimelineProps) {
    if (!trip) {
        return (
            <main className="welcome-message">
                <h1>Select a trip to get started!</h1>
            </main>
        )
    }

    const [contextStop, setContextStop] = useState<number | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleClick = () => {
            setContextStop(null);
        }
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        }
    })

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    const timeline = buildTimeline(stops);

    return (
        <main className="center-timeline">
            <div className="trip-details">
                <h1>{trip.name}</h1>
                <p>{trip.description}</p>
                <p>{trip.start_date} - {trip!.end_date}</p>
            </div>
            <div className="timeline-container">
                <DndContext onDragEnd={onDragEnd} collisionDetection={closestCenter} sensors={sensors}>
                    <SortableContext items={stops.map(stop => stop.id)} strategy={verticalListSortingStrategy}>
                    {timeline.map((item) => {
                        if (item.type === "stop") {
                            return (
                                <div className="stop-container">
                                    <div className="stop-rail">
                                        <div className="stop-line-top"></div>
                                        <div className="stop-marker"></div>
                                        <div className="stop-line-bottom"></div>
                                    </div>
                                    <SortableStopItem
                                        key={item.data.id}
                                        onClick={() => onSelectStop(item.data.id)}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            setContextStop(item.data.id);
                                            setPosition({ x: e.clientX, y: e.clientY })
                                        }}
                                        stop={item.data}/>
                                </div>
                            )
                        }
                        return (
                            <div className="travel-container">
                                <div className="travel-rail">
                                    <div className="travel-line"></div>
                                </div>
                                <TravelItem key={item.data.id} travel={item.data}/>
                            </div>
                        )
                    })}
                    </SortableContext>
                </DndContext>
                <div className="stop-container">
                    <div className="stop-rail">
                        <div className="stop-line-top"></div>
                        <div className="stop-marker"></div>
                        <div className="stop-line-bottom"></div>
                    </div>
                    <button className="create-stop-button" onClick={onCreateStop}>
                        <span className="plus">+</span>
                        <span>Add stop</span>
                    </button>
                </div>
            </div>
            <div className="trip-summary">
                <p>Budget: {trip!.budget}</p>
            </div>

            {contextStop !== null && (
                <div
                    style={{
                        top: position.y,
                        left: position.x,
                    }}
                >
                    <button onClick={async () => {
                        if(contextStop === null) return;
                        onDeleteStop(contextStop);
                        setContextStop(null);
                    }}>
                        Delete Stop
                    </button>
                </div>
            )}
        </main>
    )
}