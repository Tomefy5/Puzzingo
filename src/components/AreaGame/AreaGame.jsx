import DragPuzzleArea from "./DragPuzzleArea";
import DropPuzzleArea from "./DropPuzzleArea";
import GameHeader from "./GameHeader";

export default function AreaGame() {
  return (
    <div className="h-full flex flex-col gap-8">
        <GameHeader/>
        <DropPuzzleArea/>
        <DragPuzzleArea/>
    </div>
  )
}
