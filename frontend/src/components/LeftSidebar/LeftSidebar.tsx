import "./LeftSidebar.css"
import { useState, useEffect } from "react"
import type { Trip } from "../../types/Trip"

interface LeftSidebarProps {
    trips: Trip[];
    selectedTripId: number | null;
    onSelectTrip: (id: number) => void;
    onCreateTrip: () => Promise<void>;
    onDeleteTrip: (id: number) => void;
    onSelectStop: (id: number | null) => void;
    pageActive: string;
    onTogglePage: (active: string) => void;
}

export default function LeftSidebar({
    trips,
    selectedTripId,
    onSelectTrip,
    onCreateTrip,
    onDeleteTrip,
    onSelectStop,
    pageActive,
    onTogglePage,
}: LeftSidebarProps) {
    const [contextTrip, setContextTrip] = useState<number | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleClick = () => {
            setContextTrip(null);
        };
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        }
    })

    return (
        <aside className="left-sidebar">
            <button className="create-trip-button" onClick={onCreateTrip}>
                <span className="plus">+</span>
                <span>New trip</span>
            </button>
            <div className="trip-list">
                {trips.map((trip) => {
                    return (
                        <div
                            key={trip.id}
                            className={`trip ${trip.id === selectedTripId ? "selected" : ""}`}
                            onClick={() => onSelectTrip(trip.id)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setContextTrip(trip.id);
                                setPosition({ x: e.clientX, y: e.clientY });
                            }}
                        >
                            {/*<span>Emoji</span>*/}
                            <span>{trip.name}</span>
                        </div>
                    )
                })}
            </div>
            <div className="extra-pages">
                <div
                    className={`settings-nav ${pageActive === "settings" ? "selected" : ""}`}
                    onClick={() => {
                        onSelectStop(null);
                        onTogglePage(pageActive === "settings" ? "" : "settings");
                    }}
                >
                    <span>⚙</span>
                    <span>Settings</span>
                </div>
                <div
                    className={`about-nav ${pageActive === "about" ? "selected" : ""}`}
                    onClick={() => {
                        onSelectStop(null);
                        onTogglePage(pageActive === "about" ? "" : "about");
                    }}
                >
                    <span>🛈</span>
                    <span>About</span>
                </div>
            </div>

            {contextTrip !== null && (
                <div
                    style={{
                        position: "fixed",
                        top: position.y,
                        left: position.x,
                        zIndex: 1000,
                    }}
                    className="context-menu"
                >
                    {/*<button onClick={async () => {

                    }}>
                        Change Icon
                    </button>*/}
                    <button className="context-menu-button" onClick={async () => {

                    }}>
                        Rename
                    </button>
                    <button className="context-menu-button" onClick={async () => {
                        if(contextTrip === null) return;
                        onDeleteTrip(contextTrip);
                        setContextTrip(null);
                    }}>
                        Delete Trip
                    </button>
                </div>
            )}
        </aside>
    )
}