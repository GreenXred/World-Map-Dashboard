export const translations = {
    en: {
        pageTitle: "Country:",
        selectedCountry: "Selected country:",
        loading: "Loading...",
        noData: "No data",
    },
    ru: {
        pageTitle: "Страна:",
        selectedCountry: "Выбранная страна:",
        loading: "Загрузка...",
        noData: "Нет данных",
    },
} as const;

export type Language = keyof typeof translations;
