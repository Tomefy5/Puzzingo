import { useState } from "react";

const chooseImageOptions = [
  { label: "Import Image", value: "import" },
  { label: "Use Model", value: "useModel" },
];

const puzzingoModels = [
  { label: "Animal", value: "animal", url: "" },
  { label: "Object", value: "object", url: "" },
  { label: "Nature", value: "nature", url: "" },
  { label: "People", value: "people", url: "" },
];

export default function ImageImport() {
  const [importOption, setImportOption] = useState(null);

  return (
    <>
      <div className="flex items-start justify-center gap-6">
        {chooseImageOptions.map((option, index) => (
          <button
            onClick={() => setImportOption(option.value)}
            key={index}
            className={`py-2 px-4 rounded-full duration-200 ${
              importOption === option.value ? "ring-2" : "ring-1"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 my-4 min-h-14">
        {importOption === "import" ? (
          <>
            <label
              htmlFor="file-upload"
              className="cursor-pointer px-4 py-2 ring-2 ring-slate-700 text-slate-400 rounded-md hover:ring-slate-400 hover:text-slate-200 transition duration-200"
            >
              Choose your image
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={(e) => console.log(e.target.files[0])}
              className="hidden"
            />
          </>
        ) : (
          <>
            <label
              htmlFor="puzzle-model"
              className="cursor-pointe font-medium text-slate-400 rounded-md transition duration-200"
            >
              Choose model :
            </label>
            <select
              name="puzzle-model"
              id="puzzle-model"
              className="text-blue-700 font-medium py-2 px-4 appearance-none rounded flex bg-transparent ring-1 focus:outline-none"
            >
              {puzzingoModels.map((model, index) => (
                <option key={index} value={model.value} className="bg-slate-900">
                  {model.label}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </>
  );
}
