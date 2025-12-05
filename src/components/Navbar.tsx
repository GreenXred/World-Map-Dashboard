// Компонент навигационной панели с анимацией и активными ссылками

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../Localization/LanguageContext";


export default function Navbar() {
    const { lang, setLang } = useLanguage();

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
                                    Home
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
                                    Map
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
                                    About
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
                        onClick={() => setLang("en")}
                        className={lang === "en" ? "text-emerald-400" : "text-slate-300"}
                    >
                        EN
                    </button>

                    <button
                        onClick={() => setLang("ru")}
                        className={lang === "ru" ? "text-emerald-400" : "text-slate-300"}
                    >
                        RU
                    </button>
                </div>
            </nav>
        </motion.header>
    );
}