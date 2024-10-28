import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Favourites from "./Pages/Favourites";
import Details from "./Pages/Details";
import NavBar from "./Component/NavBar";

function App() {
  return (
    <div>
      <div className="min-h-screen bg-white text-lg p-6 text-gray-600">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/recipe-item/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
