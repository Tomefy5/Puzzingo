import { useContext, useState } from "react"
import PuzzleContext from "../../contexts/PuzzleProvider";
import { useEffect } from "react";
import { splitImage } from "../../utils/PuzzingoFunc";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

export default function DragPuzzleArea({onDrop}) {
  
  const { selectedPuzzleImage } = useContext(PuzzleContext);
  const [pieces, setPieces] = useState([]);
  const [{isOver}, dropRef] = useDrop(() => ({
    accept: ItemTypes.PUZZING,
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))
  
  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const result = await splitImage(selectedPuzzleImage, 2, 2);
        setPieces(result);
      } catch (err) {
        console.error('Error fetching puzzle', err);
      }
    }

    fetchPieces();
  })

  return (
    <div ref={dropRef} className={`shadow-slate-600 ${isOver ? 'shadow-slate-400' : ''} duration-200 flex gap-3 items-center p-4 w-full max-w-[600px] mx-auto shadow-around rounded h-[20%] overflow-x-auto`}>
      {pieces.length > 0 ? (
        pieces.map((piece, index) => (
          <img key={index} src={piece} alt="puzzle-piece" className="h-[80px] lg:h-[90px] w-[80px] lg:4-[90px] rounded-sm shadow-around shadow-slate-800" />
        ))
      ) : (
        <p>Loading puzzle pieces</p>
      )}
    </div>
  )
}
