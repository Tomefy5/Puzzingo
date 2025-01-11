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
