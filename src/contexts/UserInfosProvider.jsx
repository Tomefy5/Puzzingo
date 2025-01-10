import { createContext, useState } from "react";

const UserInfosContext = createContext();

export default function UserInfosProvider({ children }) {
  const [userInfos, setUserInfos] = useState(null);

  const setNewUser = (name, avatar, level, stats = []) => {
    const newUser = {
      name: name,
      avatar: avatar,
      level: level,
      stats: stats,
    };

    setUserInfos(newUser);
  };
  return (
    <UserInfosContext.Provider value={{ userInfos, setNewUser }}>
      {children}
    </UserInfosContext.Provider>
  );
}
