import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion"; // Чтобы дать компоненту время отыграть exit анимацию перед удалением

import Home from "./pages/Home/Home";
import Country from "./pages/Country/Country";
import About from "./pages/About/About";
import Map from "./pages/Map/Map";
import Navbar from "./components/Navbar";
import LanguageModal from "./components/LanguageModal";
import { useLanguage } from "./i18next/LanguageContext";

export default function App() {
  const { setLang } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang-chosen");
    if (!saved) setShowModal(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <AnimatePresence>
        {showModal && (
          <LanguageModal
            onSelect={(lang) => {
              setLang(lang as any);
              localStorage.setItem("lang-chosen", "true");
              setShowModal(false);
            }}
          />
        )}
      </AnimatePresence>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<Country />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

