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
