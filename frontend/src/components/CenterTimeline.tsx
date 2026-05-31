import { buildTimeline } from "../utils/TimelineBuilder";
import StopItem from "./StopItem"
import TravelItem from "./TravelItem";

// Test Data
const stops = [
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

const travels = [
  {
    id: "1-2",
    fromId: 1,
    toId: 2,
    duration: 15,
    mode: "drive",
  },
  {
    id: "2-3",
    fromId: 2,
    toId: 3,
    duration: 8,
    mode: "walk",
  },
];

export default function CenterTimeline() {
    const timeline = buildTimeline(stops, travels)
    return (
        <main className="center-timeline">
            <h1>Trip Name</h1>
            {timeline.map((item) => {
                if (item.type === "stop") {
                    return (
                        <StopItem key={item.data.id} stop={item.data}/>
                    )
                }
                return (
                    <TravelItem key={item.data.id} travel={item.data}/>
                )
            })}
            <p>Trip summary here</p>
        </main>
    )
}