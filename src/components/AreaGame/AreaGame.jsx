import { DndProvider } from "react-dnd";
import DropPieceArea from "./DropPieceArea";
import DropPuzzleArea from "./DropPuzzleArea";
import GameHeader from "./GameHeader";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MultiBackend } from "react-dnd-multi-backend";
import { TouchTransition, MouseTransition } from "react-dnd-multi-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useContext, useEffect, useState } from "react";
import PuzzleContext from "../../contexts/PuzzleProvider";
import {
  checkWin,
  constructPiecesInfos,
  shuffleArray,
  splitImage,
} from "../../utils/PuzzingoFunc";
import UserInfosContext from "../../contexts/UserInfosProvider";
import { useNavigate } from "react-router-dom"; 

export default function AreaGame() {
  const navigate = useNavigate();
  const { selectedPuzzleImage } = useContext(PuzzleContext);
  const { userInfos } = useContext(UserInfosContext);

  const [puzzlePiecesInfos, setPuzzlePiecesInfos] = useState([]);
  const [piecesInPuzzleArea, setPiecesInPuzzleArea] = useState([]);
  const [piecesInPieceArea, setPiecesInPieceArea] = useState([]);
  const [isWinning, setIsWinning] = useState(false);

  const arrayLength =
    userInfos.level === "level1"
      ? 2 * 2
      : userInfos.level === "level2"
      ? 3 * 3
      : 4 * 4;

  useEffect(() => {
    setPiecesInPuzzleArea(Array(arrayLength).fill(null));
  }, [arrayLength]);

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        let colNumber =
          userInfos.level === "level1"
            ? 2
            : userInfos.level === "level2"
            ? 3
            : userInfos.level === "level3"
            ? 4
            : undefined;

        const result = await splitImage(
          selectedPuzzleImage,
          colNumber,
          colNumber
        );

        const puzzlePiecesInfo = await constructPiecesInfos(result);
        setPuzzlePiecesInfos(puzzlePiecesInfo);
        console.log("Puzzle pieces fetched:", puzzlePiecesInfo);
      } catch (err) {
        console.error("Error fetching puzzle:", err);
      }
    };

    fetchPieces();
  }, [selectedPuzzleImage, userInfos.level]);

  useEffect(() => {
    if (puzzlePiecesInfos.length > 0) {
      const shuffledArray = shuffleArray(puzzlePiecesInfos);
      setPiecesInPieceArea(shuffledArray);
      console.log("Shuffled pieces:", shuffledArray);
    }
  }, [puzzlePiecesInfos]);

  useEffect(() => {
    if (isWinning) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isWinning, navigate]);

  // useEffect(() => {
  //   console.log("Pieces in puzzle area:", piecesInPuzzleArea);
  //   console.log("Pieces in piece area:", piecesInPieceArea);
  // }, [piecesInPuzzleArea, piecesInPieceArea]);

  useEffect(() => {
    if(piecesInPieceArea.length > 0 && piecesInPieceArea.every(piece => piece === null)) {
      const isWin = checkWin(piecesInPuzzleArea);
      setIsWinning(isWin);
    }
  }, [piecesInPieceArea])

  const multiBackendOptions = {
    backends: [
      {
        backend: HTML5Backend,
        transition: MouseTransition,
      },
      {
        backend: TouchBackend,
        options: { enableMouseEvents: true, delayTouchStart: 100 },
        transition: TouchTransition,
      },
    ],
  };

  function dropHandler(item, dropZoneIndex) {
    if (item.fromArea === "puzzleArea") {
      setPiecesInPieceArea((prev) => {
        const updatedPieces = [...prev]; 
        for (let i = 0; i < updatedPieces.length; i++) {
          if (updatedPieces[i] === null) {
            updatedPieces[i] = {...item, fromArea: 'pieceArea'}; 
            break;
          }
        }
        return updatedPieces; 
      });
  
      setPiecesInPuzzleArea((prev) => {
        return prev.map((piece) => {
          if (piece && piece.pieceIndex === item.pieceIndex) {
            return null;
          }
          return piece;
        });
      });
  
    } else if (item.fromArea === "pieceArea") {
      setPiecesInPuzzleArea((prev) => {
        const updated = [...prev]; 
        updated[dropZoneIndex] = {...item, fromArea: 'puzzleArea'};
        return updated;
      });
  
      setPiecesInPieceArea((prev) =>
        prev.map((piece, index) => (item.pieceIndex === index ? null : piece)) 
      );
    }
  }
  

  return (
    <DndProvider backend={MultiBackend} options={multiBackendOptions}>
      <div className="h-full flex flex-col gap-8">
        <GameHeader />
        <div
          className={`${
            userInfos.level === "level1"
              ? "grid-cols-2"
              : userInfos.level === "level2"
              ? "grid-cols-3"
              : "grid-cols-4"
          } grid shadow-slate-600 duration-200 p-1 gap-[1px] items-center  mx-auto rounded shadow-around`}
        >
          {Array.from({ length: arrayLength }).map((_, index) => (
            <DropPuzzleArea
              key={index}
              dropZoneIndex={index}
              piece={piecesInPuzzleArea[index]}
              onDrop={(item, dropZoneIndex) => {
                dropHandler(item, dropZoneIndex);
              }}
            />
          ))}
        </div>
        <DropPieceArea
          pieces={piecesInPieceArea}
          isWinning={isWinning}
          onDrop={(item, dropZoneIndex) => {
            dropHandler(item, dropZoneIndex);
          }}
        />
      </div>
    </DndProvider>
  );
}
