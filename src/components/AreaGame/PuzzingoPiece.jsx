import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

export default function PuzzingoPiece({ piece }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.PUZZING,
    item: piece,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className={`${isDragging ? "opacity-50" : "opacity-100"} ${
        piece.fromArea === "puzzleArea" ? "object-cover w-full h-full" : "h-[80px] w-[80px]"
      } flex-grow-0 flex-shrink-0 duration-200 rounded-sm`}
    >
      <img
        src={piece.url}
        alt={`${piece.name}`}
        className="w-full h-full object-countain rounded-sm"
      />
    </div>
  );
}
