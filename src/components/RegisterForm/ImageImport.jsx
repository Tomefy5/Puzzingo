import { useState } from "react";
import { chooseRandomModel, compressImage, handleImageChange } from "../../utils/PuzzingoFunc";
import { useEffect } from "react";
import Fox from "../../assets/puzzingo-model/fox.jpg";
import Kitchen from "../../assets/puzzingo-model/kitchen.jpg";
import Nature from "../../assets/puzzingo-model/nature.jpg";
import Art from "../../assets/puzzingo-model/art.jpg";
import Food from "../../assets/puzzingo-model/food.jpg";

const chooseImageOptions = [
  { label: "Import Image", value: "import" },
  { label: "Use Model", value: "useModel" },
];

const puzzingoModels = [
  {
    label: "Animal",
    value: "animal",
    url: Fox,
  },
  {
    label: "Object",
    value: "object",
    url: Kitchen,
  },
  {
    label: "Nature",
    value: "nature",
    url: Nature,
  },
  { label: "Art", value: "art", url: Art },
  { label: "Food", value: "food", url: Food },
];

export default function ImageImport({ setPuzzleImage }) {
  const firstRandomModel = chooseRandomModel(
    puzzingoModels,
    puzzingoModels.length
  );
  const [importOption, setImportOption] = useState("import");
  const [, setImage] = useState(null);
  const [preview, setPreview] = useState(firstRandomModel.url);
  const [model, setModel] = useState(firstRandomModel);

  useEffect(() => {
    if (importOption === "useModel" && model) {
      setPreview(model.url);
    }
  }, [model]);

  useEffect(() => {
    setPuzzleImage(preview);
  }, [preview]);


  useEffect(() => {
    const compressCurrentPreview = async () => {
        const compressedPreview = await compressImage(preview);
        if (compressedPreview) {
          setPreview(compressedPreview);
        }
    };
  
    compressCurrentPreview();
  }, [preview, importOption]);
  

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
              onChange={
                importOption === "import" &&
                ((event) => {
                  handleImageChange(event, setImage, setPreview);
                })
              }
              className="hidden"
            />
          </>
        ) : (
          <>
            <input
              readOnly
              type="text"
              value={model.label}
              className="text-slate-900 py-2 w-36 md:w-48 px-2 md:px-4 rounded bg-blue-200 text-center font-bold focus:outline-none"
            />
            <button
              onClick={
                importOption === "useModel" &&
                (() => {
                  setModel(
                    chooseRandomModel(puzzingoModels, puzzingoModels.length)
                  );
                })
              }
              className="text-blue-700 hover:bg-blue-900 hover:text-blue-200 font-medium py-2 px-4 appearance-none rounded flex bg-transparent ring-1 focus:outline-none"
            >
              Change
            </button>
          </>
        )}
      </div>
    </>
  );
}
