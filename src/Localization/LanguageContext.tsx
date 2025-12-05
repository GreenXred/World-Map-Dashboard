import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";
import type { Language } from "./translations";

type LanguageContextType = {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: keyof typeof translations["en"]) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("lang") as Language | null;
            if (saved === "en" || saved === "ru") {
                return saved;
            }
        }
        return "en";
    });

    // При изменении языка сохраняем его в localStorage
    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);

    function t(key: keyof typeof translations["en"]) {
        return translations[lang][key];
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return ctx;
}
