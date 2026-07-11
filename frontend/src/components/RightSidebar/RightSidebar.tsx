import "./RightSidebar.css"
import { useState, useEffect } from "react"
import type { Stop } from "../../types/Stop"
import type { StopRequest } from "../../api/stopAPI"

interface RightSidebarProps {
    stop: Stop | null;
    onCloseStop: (id: number | null) => void;
    onUpdateStop: (id: number, input: StopRequest) => void;
    onDeleteStop: (id: number) => void;
}

export default function RightSidebar({
    stop,
    onCloseStop,
    onUpdateStop,
    onDeleteStop,
}: RightSidebarProps) {
    if (!stop) {
        return
    }

    const [requestData, setRequestData] = useState<StopRequest>({
        name: "",
        category: "",
        description: "",
        address: "",
        latitude: 0,
        longitude: 0,
        cost: 0,
        time_zone: "",
        arrival_time: "",
        departure_time: "",
    })

    useEffect(() => {
        setRequestData({
            name: stop.name,
            category: stop.category,
            description: stop.description ?? "",
            address: stop.address ?? "",
            latitude: stop.latitude ?? 0,
            longitude: stop.longitude ?? 0,
            cost: stop.cost ?? 0,
            time_zone: stop.time_zone ?? "",
            arrival_time: stop.arrival_time ?? "",
            departure_time: stop.departure_time ?? "",
        })
    }, [stop])

    const handleChange = (
        field: keyof StopRequest,
        value: string | number,
    ) => {
        setRequestData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <aside className="right-sidebar">
            <div className="stop-details">
                <h2>Stop Details</h2>
                <button className="close-stop-button" onClick={() => {onCloseStop(null)}}>&times;</button>
            </div>
            <div className="stop-name">
                <label>Name</label>
                <input
                    type="text"
                    value={requestData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                />
            </div>
            <div className="stop-category">
                <label>Category</label>
                <select
                    value={requestData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                >
                    <option value="" disabled>Select a category</option>
                    <option value="Lodging">Lodging</option>
                    <option value="Dining">Dining</option>
                    <option value="Sightseeing">Sightseeing</option>
                    <option value="Activity">Activity</option>
                    <option value="Transit">Transit</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="stop-desc">
                <label>Description</label>
                <textarea
                    value={requestData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                />
            </div>
            <div className="stop-cost">
                <label>Cost</label>
                <div className="stop-cost-input">
                    <span>$</span>
                    <input
                        type="number"
                        value={requestData.cost}
                        onChange={(e) => handleChange("cost", Number(e.target.value))}
                    />
                </div>
            </div>
            <div className="stop-address">
                <label>Address</label>
                <input
                    type="text"
                    value={requestData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                />
            </div>
            <div className="stop-time-zone">
                <label>Time Zone</label>
                <input
                    type="text"
                    value={requestData.time_zone}
                    onChange={(e) => handleChange("time_zone", e.target.value)}
                />
            </div>
            <div className="stop-arrival">
                <label>Arrival Time</label>
                <input
                    type="datetime-local"
                    value={requestData.arrival_time || ""}
                    onChange={(e) => handleChange("arrival_time", e.target.value)}
                />
            </div>
            <div className="stop-departure">
                <label>Departure Time</label>
                <input
                    type="datetime-local"
                    value={requestData.departure_time || ""}
                    onChange={(e) => handleChange("departure_time", e.target.value)}
                />
            </div>
            <div className="stop-button-container">
                <button className="save-stop-button" onClick={() => {onUpdateStop(stop.id, requestData)}}>Save</button>
                <button className="delete-stop-button" onClick={() => {onDeleteStop(stop.id)}}>Delete Stop</button>
            </div>
        </aside>
    )
}