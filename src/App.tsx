import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Country from "./pages/Country/Country";
import About from "./pages/About/About";
import Map from "./pages/Map/Map";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country" element={<Country />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

