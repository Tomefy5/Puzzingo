import { useNavigate } from "react-router-dom";
import AvatarList from "./AvatarList";
import ImageImport from "./ImageImport";
import LevelButtons from "./LevelButtons";
import { useState } from "react";
import { extractUsername } from "../../utils/UserInfoTraitement";

export default function RegisterForm() {
  const [userName, setUserName] = useState("Unknown");
  const [userAvatar, setUserAvatar] = useState("unknown");
  const [puzzleImage, setPuzzleImage] = useState(null);
  const [level, setLevel] = useState(null);

  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/game");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="w-full md:w-[90%] lg:w-[80%] rounded mx-auto p-4 flex flex-col items-center gap-5 shadow-around shadow-slate-600"
    >
      <h2 className="font-extrabold text-2xl md:text-3xl text-blue-700 opacity-85">
        Register
      </h2>
      <input
        type="text"
        name="name"
        id="input-username"
        className="h-8 rounded-md py-2 px-4 text-slate-400 font-medium bg-transparent duration-300 my-2 opacity-70 focus:opacity-100 shadow-around shadow-slate-600 focus:outline-none"
        placeholder="Your name..."
        onBlur={() => {
          extractUsername(setUserName);
        }}
      />

      <AvatarList setUserAvatar={setUserAvatar} />
      <ImageImport setPuzzleImage={setPuzzleImage} />
      <LevelButtons setLevel={setLevel} />

      <div className="my-2">
        <button
          onClick={() => {
            navigateHandler();
          }}
          className="bg-gradient-to-r from-blue-800 to-blue-950 py-2 px-6 font-medium rounded-md hover:scale-105 transition-all duration-200"
        >
          <span className="text-blue-300">Play</span>
        </button>
      </div>
    </form>
  );
}
