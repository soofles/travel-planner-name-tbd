import "./App.css"
import { useState, useEffect } from "react"
import type { Trip } from "./types/Trip"
import type { Stop } from "./types/Stop"
import type { Travel } from "./types/Travel"
import type { TripRequest } from "./api/tripAPI"
import type { StopRequest } from "./api/stopAPI"
import type { DragEndEvent } from "@dnd-kit/core"
import { createTrip, getTrips, updateTrip, deleteTrip } from "./api/tripAPI"
import { createStop, getStops, updateStop, deleteStop, reorderStops } from "./api/stopAPI"
import { calculateTravels } from "./utils/TravelCalculator"
import { arrayMove } from "@dnd-kit/sortable"
import TitleBar from "./components/TitleBar/TitleBar"
import LeftSidebar from "./components/LeftSidebar/LeftSidebar"
import CenterTimeline from "./components/CenterTimeline/CenterTimeline"
import RightSidebar from "./components/RightSidebar/RightSidebar"

function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);
  const [stops, setStops] = useState<Stop[]>([]);
  const [selectedStopId, setSelectedStopId] = useState<number | null>(null);
  const [travels, setTravels] = useState<Travel[]>([]);
  const [pageActive, setPageActive] = useState("");

  const loadTrips = async () => {
    const res = await getTrips();
    setTrips(res);
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const handleCreateTrip = async () => {
    const date = new Date().toLocaleDateString("en-CA");
    const dateTruncated = date.slice(0, 16);
    const defaults: TripRequest = {
      name: "New Trip",
      description: "Let's start planning your next adventure!",
      start_date: dateTruncated,
      end_date: dateTruncated,
      budget: 0,
    };
    await createTrip(defaults);
    loadTrips();
    setSelectedTripId(trips.length + 1);
  }

  const handleUpdateTrip = async (id: number, input: TripRequest) => {
    await updateTrip(id, input);
    loadTrips();
  }

  const handleDeleteTrip = async (id: number) => {
    await deleteTrip(id);
    loadTrips();
  }

  const loadStops = async () => {
    if (!selectedTripId) {
      setStops([]);
      return;
    }
    const res = await getStops(selectedTripId);
    setStops(res);
  }

  useEffect(() => {
    setSelectedStopId(null);
    loadStops();
  }, [selectedTripId]);

  const handleCreateStop = async () => {
    if (!selectedTripId) return;
    const date = new Date().toISOString();
    const defaults: StopRequest = {
      name: "New Stop",
      category: "",
      description: "",
      address: "",
      cost: 0,
      time_zone: "",
      arrival_time: date,
      departure_time: date,
    }
    await createStop(selectedTripId, defaults);
    loadStops();
    setSelectedStopId(stops.length + 1);
  }

  const handleUpdateStop = async (id: number, input: StopRequest) => {
    await updateStop(id, input);
    loadStops();
  }

  const handleDeleteStop = async (id: number) => {
    setSelectedStopId(null);
    await deleteStop(id);
    loadStops();
  }

  const handleReorderStops = async (input: number[]) => {
    if (!selectedTripId) return;
    await reorderStops(selectedTripId, input);
  }

  const loadTravels = async () => {
    const res = await calculateTravels(stops);
    setTravels(res);
  };

  useEffect(() => {
    loadTravels()
  }, [stops]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setStops(prev => {
      const oldIndex = prev.findIndex(stop => stop.id === active.id);
      const newIndex = prev.findIndex(stop => stop.id === over.id);
      const newStops = arrayMove(prev, oldIndex, newIndex);
      handleReorderStops(newStops.map((stop) => stop.id));
      return newStops
    });
  }

  return (
    <div className="root-layout">
      <TitleBar
      />
      <div className={`app-layout ${selectedStopId === null ? "right-closed" : ""}`}>
        <LeftSidebar
          trips={trips}
          selectedTripId={selectedTripId}
          onSelectTrip={setSelectedTripId}
          onCreateTrip={handleCreateTrip}
          onDeleteTrip={handleDeleteTrip}
          onSelectStop={setSelectedStopId}
          pageActive={pageActive}
          onTogglePage={setPageActive}
        />
        <CenterTimeline
          trip={trips.find(trip => trip.id === selectedTripId) ?? null}
          stops={stops}
          travels={travels}
          selectedStopId={selectedStopId}
          onUpdateTrip={handleUpdateTrip}
          onSelectStop={setSelectedStopId}
          onCreateStop={handleCreateStop}
          onDeleteStop={handleDeleteStop}
          onDragEnd={handleDragEnd}
          pageActive={pageActive}
          onTogglePage={setPageActive}
        />
        <RightSidebar
          stop={stops.find(stop => stop.id === selectedStopId) ?? null}
          onCloseStop={setSelectedStopId}
          onUpdateStop={handleUpdateStop}
          onDeleteStop={handleDeleteStop}
        />
      </div>
    </div>
  );
}

export default App;