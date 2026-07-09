import "./CenterTimeline.css"
import { useState, useEffect } from "react"
import { buildTimeline } from "../../utils/TimelineBuilder"
import type { DragEndEvent } from "@dnd-kit/core"
import type { Trip } from "../../types/Trip"
import type { TripRequest } from "../../api/tripAPI"
import type { Stop } from "../../types/Stop"
import type { Travel } from "../../types/Travel"
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableStopItem from "../SortableStopItem/SortableStopItem"
import TravelItem from "../TravelItem/TravelItem"
import TripSummary from "../TripSummary/TripSummary"
import Settings from "../Settings/Settings"
import About from "../About/About"

interface CenterTimelineProps {
    trip: Trip | null;
    stops: Stop[];
    travels: Travel[];
    selectedStopId: number | null;
    onUpdateTrip: (id: number, input: TripRequest) => void;
    onSelectStop: (id: number) => void;
    onCreateStop: () => void;
    onDeleteStop: (id: number) => void;
    onDragEnd: (e: DragEndEvent) => void;
    pageActive: string;
    onTogglePage: (active: string) => void;
}

export default function CenterTimeline({
    trip,
    stops,
    travels,
    selectedStopId,
    onUpdateTrip,
    onSelectStop,
    onCreateStop,
    onDeleteStop,
    onDragEnd,
    pageActive,
    onTogglePage,
}: CenterTimelineProps) {
    if (pageActive === "settings") {
        return (
            <Settings
                onTogglePage={onTogglePage}
            />
        )
    }

    if (pageActive === "about") {
        return (
            <About
                onTogglePage={onTogglePage}
            />
        )
    }

    if (!trip) {
        return (
            <main className="welcome-message">
                <h1>Select a trip to get started!</h1>
            </main>
        )
    }

    const travelsLoaded = stops.length < 2 || travels.length === stops.length - 1;
    if (!travelsLoaded) {
        return (
            <main className="loading">
                <h1>Loading trip...</h1>
            </main>
        )
    }

    const [contextStop, setContextStop] = useState<number | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [requestData, setRequestData] = useState<TripRequest>({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        budget: 0,
    })

    useEffect(() => {
        const handleClick = () => {
            setContextStop(null);
        }
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        }
    })

    useEffect(() => {
        setRequestData({
            name: trip.name,
            description: trip.description,
            start_date: trip.start_date,
            end_date: trip.end_date,
            budget: trip.budget,
        })
    }, [trip.id]);

    const handleChange = (
        field: keyof TripRequest,
        value: string | number,
    ) => {
        setRequestData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            onUpdateTrip(trip.id, requestData);
        }, 800);

        return () => clearTimeout(timeout);
    }, [requestData]);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    const timeline = buildTimeline(stops, travels);

    return (
        <main className="center-timeline">
            <div className="trip-details">
                <input
                    className="trip-title"
                    type="text"
                    value={requestData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <textarea
                    className="trip-desc"
                    rows={1}
                    value={requestData.description}
                    onChange={(e) => {
                        handleChange("description", e.target.value);
                        e.target.style.height = "0px";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                />
                <div className="trip-budget-container">
                    <span>$</span>
                    <input
                        className="trip-budget"
                        type="number"
                        value={requestData.budget}
                        onChange={(e) => handleChange("budget", e.target.value)}
                    />
                </div>
                <div className="trip-date-container">
                    <input
                        className="trip-date"
                        type="date"
                        value={requestData.start_date}
                        onChange={(e) => handleChange("start_date", e.target.value)}
                    />
                    <span> — </span>
                    <input
                        className="trip-date"
                        type="date"
                        value={requestData.end_date}
                        onChange={(e) => handleChange("end_date", e.target.value)}
                    />
                </div>
            </div>
            <div className="timeline-container">
                <DndContext onDragEnd={onDragEnd} collisionDetection={closestCenter} sensors={sensors}>
                    <SortableContext items={stops.map(stop => stop.id)} strategy={verticalListSortingStrategy}>
                    {timeline.map((item) => {
                        if (item.type === "stop") {
                            return (
                                <div className="stop-container">
                                    <div className="stop-rail">
                                        <div className={`stop-line-top ${item.data.id === selectedStopId ? "selected" : ""}`}></div>
                                        <div className={`stop-marker ${item.data.id === selectedStopId ? "selected" : ""}`}></div>
                                        <div className={`stop-line-bottom ${item.data.id === selectedStopId ? "selected" : ""}`}></div>
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
                <div className="travel-container-short">
                    <div className="travel-rail">
                        <div className="travel-line"></div>
                    </div>
                </div>
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
            <TripSummary
                trip={trip}
                stops={stops}
                travels={travels}
                onUpdateTrip={onUpdateTrip}
            />

            {contextStop !== null && (
                <div
                    style={{
                        position:"fixed",
                        top: position.y,
                        left: position.x,
                        zIndex: 1000,
                    }}
                    className="context-menu"
                >
                    <button className="context-menu-button" onClick={async () => {
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