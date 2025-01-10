import { ArrowBigLeft } from "lucide-react";
import UserProfil from "./UserProfil";
import { useNavigate } from "react-router-dom";
export default function GameHeader() {
  const navigate = useNavigate();
  const navigationHandler = () => {
    navigate('/');
  }
  return (
    <div className="w-full max-w-[600px] mx-auto rounded flex items-center justify-between">
      <button onClick={() => navigationHandler()} className="group h-10 w-10 flex items-center justify-between shadow-around shadow-slate-600 hover:shadow-slate-500 p-2 rounded-full transition-all duration-200">
        <ArrowBigLeft className="text-slate-500 group-hover:text-slate-400 transition-all duration-200" />
      </button>

      <UserProfil/>
      </div>
  );
}
