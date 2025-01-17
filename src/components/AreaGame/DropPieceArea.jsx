import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import PuzzingoPiece from "./PuzzingoPiece";
import { Fragment, useEffect, useState } from "react";

export default function DropPieceArea({ pieces, onDrop, isWinning }) {
  const [piecePieces, setPiecePieces] = useState([]);
  useEffect(() => {
    setPiecePieces(pieces);
  }, [pieces]);
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.PUZZING,
    drop: (item) => {
      if (item.fromArea === "puzzleArea") {
        onDrop(item);
      }
    },
    canDrop: (item) => item.fromArea === "puzzleArea",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={dropRef}
      className={`shadow-slate-600 ${
        isOver ? "shadow-slate-400" : ""
      } duration-200 flex gap-3 items-center p-4 w-full mx-auto shadow-around rounded h-[110px] lg:h-[130px] overflow-x-auto`}
    >
      {piecePieces.length > 0 ? (
        piecePieces.map((piece, index) =>
          piece ? (
            <PuzzingoPiece
              key={index}
              piece={{ ...piece, fromArea: "pieceArea", pieceIndex: index }}
            />
          ) : (
            <Fragment key={index}></Fragment>
          )
        )
      ) : (
        <p className="text-center font-medium w-full">Loading puzzle pieces</p>
      )}
      {isWinning && <p className="text-center w-full font-bold text-xl md:text-3xl">🎉 Congrats! You nailed the puzzle! 🧩✨</p>}
    </div>
  );
}
