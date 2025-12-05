import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion"; // Чтобы дать компоненту время отыграть exit анимацию перед удалением
import LanguageModal from "./components/LanguageModal";
import { useTranslation } from "react-i18next";


import Home from "./pages/Home/Home";
import Country from "./pages/Country/Country";
import About from "./pages/About/About";
import Map from "./pages/Map/Map";
import Navbar from "./components/Navbar";

export default function App() {
  const { i18n } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const langChosen = localStorage.getItem("lang-chosen");

    if (!langChosen) {
      setShowModal(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />

      <AnimatePresence>
        {showModal && (
          <LanguageModal
            onSelect={(lang) => {
              i18n.changeLanguage(lang);       // переключаем язык в i18next
              localStorage.setItem("lang", lang);      // для Navbar, если ты там читаешь
              localStorage.setItem("lang-chosen", "true");
              setShowModal(false);             // закрываем модалку
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

