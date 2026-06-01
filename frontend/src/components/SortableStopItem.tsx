import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Stop } from "../types/Stop";
import StopItem from "./StopItem";

interface StopProps {
    stop: Stop;
}

export default function SortableStopItem({ stop }: StopProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stop.id.toString() });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
    zIndex: isDragging ? 999 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      className={`sortable-stop-item ${isDragging ? "drag" : ""}`}
      style={style}
      {...attributes}
      {...listeners}
    >
      <StopItem stop={stop} />
    </div>
  );
}