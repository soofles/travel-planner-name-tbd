import "./CenterTimeline.css"
import { buildTimeline } from "../utils/TimelineBuilder"
import { DndContext, closestCenter } from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import type { Trip } from "../types/Trip"
import type { Stop } from "../types/Stop"
import SortableStopItem from "./SortableStopItem"
import TravelItem from "./TravelItem"

interface CenterTimelineProps {
    trip: Trip | null;
    stops: Stop[];
    onSelectStop: (id: number) => void;
    onCreateStop: () => void;
    onDragEnd: (e: DragEndEvent) => void;
}

export default function CenterTimeline({
    trip,
    stops,
    onSelectStop,
    onCreateStop,
    onDragEnd,
}: CenterTimelineProps) {
    const timeline = buildTimeline(stops);

    if (!trip) {
        return (
            <main className="welcome-message">
                <h1>Select a trip to get started!</h1>
            </main>
        )
    }

    return (
        <main className="center-timeline">
            <h1>{trip.name}</h1>
            <p>{trip.description}</p>
            <p>{trip.start_date} - {trip!.end_date}</p>
            <div className="timeline-container">
                <DndContext onDragEnd={onDragEnd} collisionDetection={closestCenter}>
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
                                    <SortableStopItem key={item.data.id} onClick={() => onSelectStop(item.data.id)} stop={item.data}/>
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
                <button onClick={onCreateStop}>+ New stop</button>
            </div>
            <p>Budget: {trip!.budget}</p>
        </main>
    )
}