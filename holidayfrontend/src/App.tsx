import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FamilyPage from "./pages/familyPage/FamilyPage";
import HomePage from "./pages/homePage/HomePage";
import HolidayPage from "./pages/holidayPage/holidayPage";
import WishPage from "./pages/wishPage/wishPage";
import VotePage from "./pages/votePage/votePage";

/* 
Hier wird ein Router zum Rendern der Seiten erstellt:
*/
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/family" element={<FamilyPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/holiday" element={<HolidayPage />} />
        <Route path="/wish" element={<WishPage />} />
        <Route path="/vote" element={<VotePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
