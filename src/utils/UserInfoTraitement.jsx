export const extractUsername = (setUserName) => {
  const name = document.getElementById("input-username").value;
  if (name.trim() && name.trim() !== "") {
    setUserName(name);
  }
};
