import avatar from "../../assets/avatars/avatar1.svg";

export default function UserProfil() {
  return (
    <div className="flex flex-col gap-2 translate-y-1">
      <button
        className="p-2 relative rounded-full flex items-center justify-center h-12 w-12 md:h-14 md:w-14"
        onClick={() => {}}
      >
        <div className="absolute w-full h-full bg-slate-300 rounded-full opacity-25 shadow-around shadow-blue-300"></div>
        <img src={avatar} alt={`avatar`} className="h-full" />
      </button>
      <span className="font-medium text-sm text-slate-300">Tomefy</span>
    </div>
  );
}
