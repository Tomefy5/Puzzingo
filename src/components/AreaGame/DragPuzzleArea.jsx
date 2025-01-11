import { useContext, useState } from "react"
import PuzzleContext from "../../contexts/PuzzleProvider";
import { useEffect } from "react";
import { splitImage } from "../../utils/PuzzingoFunc";

export default function DragPuzzleArea() {
  
  const { selectedPuzzleImage } = useContext(PuzzleContext);
  const [pieces, setPieces] = useState([]);
  
  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const result = await splitImage(selectedPuzzleImage, 3, 3);
        setPieces(result);
      } catch (err) {
        console.error('Error fetching puzzle', err);
      }
    }

    fetchPieces();
  })

  return (
    <div className="flex gap-3 items-center p-4 w-full max-w-[600px] mx-auto shadow-around shadow-slate-600 rounded h-[20%] overflow-x-auto">
      {pieces.length > 0 ? (
        pieces.map((piece, index) => (
          <img key={index} src={piece} alt="puzzle-piece" className="h-[80px] lg:h-[90px] w-[80px] lg:w-[90px] rounded-sm shadow-around shadow-slate-800" />
        ))
      ) : (
        <p>Loading puzzle pieces</p>
      )}
    </div>
  )
}
