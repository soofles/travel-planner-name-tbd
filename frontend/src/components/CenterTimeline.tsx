import { buildTimeline } from "../utils/TimelineBuilder"
import { DndContext, closestCenter } from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { useState } from "react"
import type { Stop } from "../types/Stop"
import SortableStopItem from "./SortableStopItem"
import TravelItem from "./TravelItem"

// Test Data
const testStops = [
  {
    id: 1,
    name: "Tokyo Tower",
    category: "Attraction",
    description: "",
    address: "Tokyo",
    latitude: 0,
    longitude: 0,
    cost: 35,
    arrival: "10:00",
    departure: "12:00",
  },
  {
    id: 2,
    name: "Shibuya Crossing",
    category: "Attraction",
    description: "",
    address: "Tokyo",
    latitude: 0,
    longitude: 0,
    cost: 0,
    arrival: "12:30",
    departure: "13:30",
  },
  {
    id: 3,
    name: "Sushi Place",
    category: "Attraction",
    description: "",
    address: "Tokyo",
    latitude: 0,
    longitude: 0,
    cost: 60,
    arrival: "14:00",
    departure: "15:00",
  },
];

export default function CenterTimeline() {
    const [stops, setStops] = useState<Stop[]>(testStops);
    const timeline = buildTimeline(stops);
    const stopIds = stops.map(stop => stop.id.toString());
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        setStops(prevList => {
            const oldIndex = prevList.findIndex(stop => stop.id.toString() === active.id);
            const newIndex = prevList.findIndex(stop => stop.id.toString() === over.id);
            return arrayMove(prevList, oldIndex, newIndex);
        })
    }
    return (
        <main className="center-timeline">
            <h1>Trip Name</h1>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                <SortableContext items={stopIds} strategy={verticalListSortingStrategy}>
                {timeline.map((item) => {
                    if (item.type === "stop") {
                        return (
                            <SortableStopItem key={item.data.id} stop={item.data}/>
                        )
                    }
                    return (
                        <TravelItem key={item.data.id} travel={item.data}/>
                    )
                })}
                </SortableContext>
            </DndContext>
            <p>Trip summary here</p>
        </main>
    )
}