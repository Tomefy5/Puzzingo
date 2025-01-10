import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import GamePage from "./pages/GamePage";
import UserInfosProvider from "./contexts/UserInfosProvider";
function App() {
  return (
    <UserInfosProvider>
      <Router>
        <div className="bg-slate-900 w-full h-auto min-h-[100vh] text-slate-200">
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </div>
      </Router>
    </UserInfosProvider>
  );
}

export default App;
