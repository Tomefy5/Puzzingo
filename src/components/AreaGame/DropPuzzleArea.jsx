import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import PuzzingoPiece from "./PuzzingoPiece";
import { useContext } from "react";
import UserInfosContext from "../../contexts/UserInfosProvider";

export default function DropPuzzleArea({ piece, onDrop, dropZoneIndex }) {
  const { userInfos } = useContext(UserInfosContext);
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.PUZZING,
    drop: (item) => {
      if (item.fromArea === "pieceArea") {
        onDrop(item, dropZoneIndex);
      }
    },
    canDrop: (item) => item.fromArea === "pieceArea",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <div
      ref={dropRef}
      className={`${
        userInfos.level === "level1"
          ? "w-[110px] h-[110px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px]"
          : userInfos.level === "level2"
          ? "w-[90px] h-[90px] md:w-[110px] md:h-[110px] lg:w-[140px] lg:h-[140px]"
          : "w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]"
      } ${isOver ? "bg-slate-700" : ""} mx-auto duration-200`}
    >
      {piece ? (
        <PuzzingoPiece piece={{ ...piece, fromArea: "puzzleArea" }} />
      ) : (
        <></>
      )}
    </div>
  );
}
