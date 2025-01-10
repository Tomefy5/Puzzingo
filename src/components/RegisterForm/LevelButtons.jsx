import { useEffect, useState } from "react";

const gameLevels = [
  { level: 1, value: "level1" },
  { level: 2, value: "level2" },
  { level: 3, value: "level3" },
];

export default function LevelButtons({ setLevel }) {
  const [selectedLevel, setSelectedLevel] = useState("level1");

  const levelSelectionHandler = (level) => {
    setSelectedLevel(level.value);
  };

  useEffect(() => {
    if (selectedLevel) {
      setLevel(selectedLevel);
    }
  }, [selectedLevel]);

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {gameLevels.map((level, index) => (
        <button
          key={index}
          className={`py-2 px-4 ring-1 ${
            index === 0 ? "rounded-l-md" : index === 2 ? "rounded-r-md" : ""
          } ${
            selectedLevel === level.value ? "bg-blue-700" : ""
          } transition-all duration-200`}
          onClick={() => levelSelectionHandler(level)}
        >
          {`Level ${level.level}`}
        </button>
      ))}
    </div>
  );
}
