import { useState, useEffect } from "react"
import type { Trip } from "../types/Trip"

interface LeftSidebarProps {
    trips: Trip[];
    // selectedTrip: number | null;
    onSelectTrip: (id: number) => void;
    onCreateTrip: () => Promise<void>;
    onDeleteTrip: (id: number) => void;
}

export default function LeftSidebar({
    trips,
    // selectedTrip,
    onSelectTrip,
    onCreateTrip,
    onDeleteTrip,
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
            <h2>Trips</h2>
            {trips.map((trip) => {
                return (
                    <div
                        key={trip.id}
                        onClick={() => onSelectTrip(trip.id)}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            setContextTrip(trip.id);
                            setPosition({ x: e.clientX, y: e.clientY });
                        }}
                    >
                        {trip.name}
                    </div>
                )
            })}
            <button onClick={onCreateTrip}>+ New trip</button>
            <hr/>
            <h3>Settings</h3>

            {contextTrip !== null && (
                <div
                    style={{
                        top: position.y,
                        left: position.x,
                    }}
                >
                    <button onClick={async () => {
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