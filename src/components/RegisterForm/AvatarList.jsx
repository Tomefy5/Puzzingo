import { useState } from "react";

const avatarsPath = import.meta.glob("../../assets/avatars/*.svg", {
  eager: true,
});
const avatars = Object.values(avatarsPath).map((module) => module.default);
export default function AvatarList({setUserAvatar}) {

    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const handleAvatarSelection = (index) => {
        setSelectedAvatar(index);
        if(selectedAvatar) {
          setUserAvatar(avatars[index]);
        }
    }

  return (
    <div className="my-2 flex flex-col gap-4">
      <h3 className="font-bold text-xl lg:text-2xl text-center text-slate-400">
        Avatars
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {avatars.map((avatar, index) => (
          <div key={index} className={`${index === selectedAvatar ? 'bg-gradient-to-t from-blue-900 via-blue-600 to-violet-800' : 'bg-slate-500'} p-1 rounded-full`}>
            <button
              className="p-2 rounded-full bg-slate-300 opacity-85 flex items-center justify-center h-14 md:h-16"
              onClick={() => handleAvatarSelection(index)}
            >
              <img
                src={avatar}
                alt={`avatar ${index + 1}`}
                className="h-full"
              />
            </button>
          </div>
        ))}
      </div>
        </div>
  );
}
