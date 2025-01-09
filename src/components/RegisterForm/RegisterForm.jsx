import AvatarList from "./AvatarList";
import ImageImport from "./ImageImport";

// const gameLevels = [
//   { level: 1, value: "level1" },
//   { level: 2, value: "level2" },
//   { level: 3, value: "level3" },
// ];



export default function RegisterForm() {
  return (
    <form onSubmit={(e) => {e.preventDefault()}} className="w-full md:w-[90%] lg:w-[80%] rounded mx-auto p-4 flex flex-col items-center gap-5 shadow-around shadow-slate-600">
      <h2 className="font-extrabold text-2xl md:text-3xl text-blue-800 opacity-85">
        Register
      </h2>

      <input
        type="text"
        name="name"
        className="h-8 rounded-md py-2 px-4 text-slate-400 font-medium bg-transparent duration-300 my-2 opacity-60 focus:opacity-100 shadow-around shadow-slate-600 focus:outline-none"
        placeholder="Your name..."
      />

      <AvatarList />
      <ImageImport/>

      

      {/* <div>
        <label htmlFor="level">Level</label>
        <select>
          {gameLevels.map((level, index) => (
            <option key={index} value={level.value}>
              {level.level}
            </option>
          ))}
        </select>
      </div> */}

      <div className="my-2">
        <button className="bg-gradient-to-r from-blue-800 to-blue-950 py-2 px-6 font-medium rounded-md hover:scale-105 transition-all duration-200">
          <span className="text-blue-300">Play</span>
        </button>
      </div>
    </form>
  );
}
