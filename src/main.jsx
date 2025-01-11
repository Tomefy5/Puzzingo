import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserInfosProvider } from "./contexts/UserInfosProvider.jsx";
import { PuzzleProvider } from "./contexts/PuzzleProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserInfosProvider>
      <PuzzleProvider>
        <App />
      </PuzzleProvider>
    </UserInfosProvider>
  </StrictMode>
);
