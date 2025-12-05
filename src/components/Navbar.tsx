// Компонент навигационной панели с анимацией и активными ссылками

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


export default function Navbar() {
    const { t, i18n } = useTranslation();

    const currentLang = i18n.language; // получить текущий язык

    // Смена и сохраниение локализации
    const changeLang = (lang: "en" | "ru") => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang); // чтобы язык сохранялся между сессиями
    };

    return (
        <motion.header
            className="bg-slate-800 border-b border-slate-700"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="text-xl font-semibold text-emerald-400">
                    World Map Dashboard
                </div>
                <div className="flex gap-6 text-lg">
                    <NavLink to="/">
                        {({ isActive }) => (
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 250 }}
                                    className={isActive ? "text-emerald-400 font-medium" : "text-slate-300 hover:text-white"}
                                >
                                    {t("nav.home")}
                                </motion.div>

                                {isActive && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute left-0 right-0 bottom-0 h-[2px] bg-emerald-400"
                                    />
                                )}
                            </div>
                        )}
                    </NavLink>
                    <NavLink to="/map">
                        {({ isActive }) => (
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 250 }}
                                    className={isActive ? "text-emerald-400 font-medium" : "text-slate-300 hover:text-white"}
                                >
                                    {t("nav.map")}
                                </motion.div>

                                {isActive && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute left-0 right-0 bottom-0 h-[2px] bg-emerald-400"
                                    />
                                )}
                            </div>
                        )}
                    </NavLink>
                    <NavLink to="/about">
                        {({ isActive }) => (
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 250 }}
                                    className={isActive ? "text-emerald-400 font-medium" : "text-slate-300 hover:text-white"}
                                >
                                    {t("nav.about")}
                                </motion.div>

                                {isActive && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute left-0 right-0 bottom-0 h-[2px] bg-emerald-400"
                                    />
                                )}
                            </div>
                        )}
                    </NavLink>
                </div>
                <div className="flex gap-2 ml-4">
                    <button
                        onClick={() => changeLang("en")}
                        className={currentLang === "en" ? "text-emerald-400" : "text-slate-300"}
                    >
                        EN
                    </button>

                    <button
                        onClick={() => changeLang("ru")}
                        className={currentLang === "ru" ? "text-emerald-400" : "text-slate-300"}
                    >
                        RU
                    </button>
                </div>
            </nav>
        </motion.header>
    );
}