import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Stop } from "../types/Stop";
import StopItem from "./StopItem";

interface StopProps {
    onClick: () => void;
    onContextMenu: (e: any) => void;
    stop: Stop;
}

export default function SortableStopItem(props: StopProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.stop.id });

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
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
    >
      <StopItem stop={props.stop} />
    </div>
  );
}