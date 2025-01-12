import imageCompression from "browser-image-compression";
export const handleImageChange = (event, setImage, setPreview) => {
  const file = event.target.files[0];
  if (file) {
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  }
};

export const chooseRandomModel = (array, arrayLength) => {
  const randomIndex = Math.floor(Math.random() * arrayLength);
  return array[randomIndex];
};

export const splitImage = async (imageSrc, rows, cols) => {
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const pieceWidth = image.width / cols;
      const pieceHeight = image.height / rows;

      const pieces = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          canvas.width = pieceWidth;
          canvas.height = pieceHeight;

          ctx.clearRect(0, 0, pieceWidth, pieceHeight);
          ctx.drawImage(
            image,
            col * pieceWidth,
            row * pieceHeight,
            pieceWidth,
            pieceHeight,
            0,
            0,
            pieceWidth,
            pieceHeight
          );

          pieces.push(canvas.toDataURL());
        }
      }
      resolve(pieces);
    };
    image.onerror = () => reject("Erreur on spliting image");
  });
};

export async function compressImage(fileUrl) {
  const imageBlob = await preparePreviewCompression(fileUrl);
  if (!imageBlob) {
    console.error("Can't compress preview");
  }

  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(imageBlob, options);
    const compressedBase64 = await imageCompression.getDataUrlFromFile(
      compressedFile
    );
    return compressedBase64;
  } catch (err) {
    console.error("Error while compressing image", err);
    return null;
  }
}

export async function urlToBlob(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error while fetching image ${response.status}`);
  }
  const blob = response.blob();
  return blob;
}

export const base64ToBlob = (base64) => {
  const [prefix, data] = base64.split(",");
  const mime = prefix.match(/:(.*?);/)[1];
  const byteString = atob(data);
  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([byteArray], { type: mime });
};

export async function preparePreviewCompression(preview) {
  if (preview.startsWith("data:image/")) {
    return base64ToBlob(preview);
  } else if (typeof preview === "string") {
    const response = await fetch(preview);
    const blob = await response.blob();
    return blob;
  } else {
    throw new Error("Invalid image source format");
  }
}
