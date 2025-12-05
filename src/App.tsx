import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion"; // Чтобы дать компоненту время отыграть exit анимацию перед удалением

import Home from "./pages/Home/Home";
import Country from "./pages/Country/Country";
import About from "./pages/About/About";
import Map from "./pages/Map/Map";
import Navbar from "./components/Navbar";

export default function App() {

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<Country />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

