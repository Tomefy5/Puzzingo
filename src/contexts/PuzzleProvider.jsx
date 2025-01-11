import { createContext, useState } from "react";

const PuzzleContext = createContext();
export function PuzzleProvider({ children }) {
  const [selectedPuzzleImage, setSelectedPuzzleImage] = useState(null);
  return (
    <PuzzleContext.Provider
      value={{ selectedPuzzleImage, setSelectedPuzzleImage }}
    >
      {children}
    </PuzzleContext.Provider>
  );
}

export default PuzzleContext;
