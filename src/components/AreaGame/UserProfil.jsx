import { useContext, useEffect, useState } from "react";
import UserInfosContext from "../../contexts/UserInfosProvider";

export default function UserProfil() {
  const unknownAvatarPath = import.meta.glob('../../assets/avatars/unknown-avatar/avatar5.svg', { eager: true });
  const unknownAvatar = unknownAvatarPath['../../assets/avatars/unknown-avatar/avatar5.svg'].default;
  const { userInfos } = useContext(UserInfosContext);
  const [userAvatar, setUserAvatar] = useState(null);
  const avatarsPath = import.meta.glob('../../assets/avatars/*.svg', { eager: true });
  const avatars = Object.values(avatarsPath).map(module => module.default);

  useEffect(() => {
    if (userInfos && userInfos.avatar && avatars[userInfos.avatar]) {
      setUserAvatar(avatars[userInfos.avatar]);
    } else {
      setUserAvatar(unknownAvatar); // Fallback to the default avatar
    }
  }, [userInfos]);

  return (
    <div className="flex flex-col gap-2 translate-y-1">
      <button
        className="p-2 relative rounded-full flex items-center justify-center h-12 w-12 md:h-14 md:w-14"
        onClick={() => {}}
      >
        <div className="absolute w-full h-full bg-slate-300 rounded-full opacity-25 shadow-around shadow-blue-300"></div>
        <img src={userAvatar} alt={`avatar`} className="h-full" />
      </button>
      <span className="font-medium text-sm text-slate-300 text-center">
        {userInfos ? userInfos.name : "Unknown"}
      </span>
      {userInfos && console.log(unknownAvatar)}
    </div>
  );
}
