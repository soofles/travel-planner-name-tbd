import { useEffect, useState } from "react"
import type { Trip } from "../types/Trip";
import { getTrips } from "../api/tripAPI";

export default function LeftSidebar() {
    const [trips, setTrips] = useState<Trip[]>([]);

    const loadTrips = async () => {
        const res = await getTrips();
        setTrips(res);
    }

    useEffect(() => {
        loadTrips();
    }, []);

    return (
        <aside className="left-sidebar">
            <h2>Trips</h2>
            <ul>
                {trips.map((trip) => {
                    return (
                        <li key={trip.id}>
                            {trip.name}
                        </li>
                    )
                })}
            </ul>
            <button>+ New trip</button>
            <hr/>
            <h3>Settings</h3>
        </aside>
    )
}