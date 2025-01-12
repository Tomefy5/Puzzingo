import { DndProvider } from "react-dnd";
import DropPieceArea from "./DropPieceArea";
import DropPuzzleArea from "./DropPuzzleArea";
import GameHeader from "./GameHeader";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function AreaGame() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex flex-col gap-8">
        <GameHeader />
        <DropPuzzleArea />
        <DropPieceArea />
      </div>
    </DndProvider>
  );
}
