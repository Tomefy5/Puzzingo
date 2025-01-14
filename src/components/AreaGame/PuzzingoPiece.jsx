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
        piece.fromArea === "puzzleArea" ? "" : "h-[80px] w-[80px]"
      } flex-grow-0 flex-shrink-0 duration-200 rounded-sm shadow-around shadow-slate-950`}
    >
      <img
        src={piece.url}
        alt={`${piece.name}`}
        className="w-full h-full object-cover rounded-sm shadow-around"
      />
    </div>
  );
}
