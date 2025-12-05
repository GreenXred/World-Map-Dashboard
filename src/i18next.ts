import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Пока заводим только небольшое количество ключей.
// Потом будем постепенно расширять этот объект.
const resources = {
    en: {
        translation: {
            // Navbar
            "nav.home": "Home",
            "nav.map": "Map",
            "nav.about": "About",

            // Home
            "home.hero.title": "Explore the world through data",
            "home.hero.subtitle":
                "This dashboard lets you explore key indicators for countries around the world.",
            "home.hero.subtitle2":
                "Each indicator shows a 20-year mini trend and a full historical chart. You can also compare two countries on the same chart.",
            "home.hero.button": "Go to map",

            "home.features.title": "What you can do",
            "home.features.map": "Interactive Map",
            "home.features.trends": "Indicator Trends",
            "home.features.compare": "Compare Countries",

            "home.how.title": "How it works",

            // About (потом дополним)
            "about.header.label": "About this project",
            "about.header.title": "World Map Dashboard",
        },
    },
    ru: {
        translation: {
            // Navbar
            "nav.home": "Главная",
            "nav.map": "Карта",
            "nav.about": "О проекте",

            // Home
            "home.hero.title": "Исследуйте мир через данные",
            "home.hero.subtitle":
                "Этот дашборд позволяет изучать ключевые показатели стран всего мира.",
            "home.hero.subtitle2":
                "Каждый индикатор показывает мини-тренд за 20 лет и полный исторический график. Можно сравнивать две страны на одном графике.",
            "home.hero.button": "Перейти к карте",

            "home.features.title": "Что можно сделать",
            "home.features.map": "Интерактивная карта",
            "home.features.trends": "Тренды индикаторов",
            "home.features.compare": "Сравнение стран",

            "home.how.title": "Как это работает",

            // About (потом дополним)
            "about.header.label": "О проекте",
            "about.header.title": "World Map Dashboard",
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",           // стартовый язык
        fallbackLng: "en",   // если чего-то нет в ru — берём en
        interpolation: {
            escapeValue: false, // для React это не нужно
        },
    });

export default i18n;
