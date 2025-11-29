// Тексты переводов для i18next

export const translations = {
    en: {
        pageTitle: "Country:",
        selectedCountry: "Selected country:",
        loading: "Loading...",
        noData: "No data",
        categoryEconomyDescription: "Key economic indicators of the country.",
        categoryDemographyDescription: "Population size and the level of urbanization.",
        categorySocialDescription: "Quality of life, health and access to education.",
        categoryEcologyDescription: "Environmental impact and climate-related indicators.",
        categoryEnvironmentDescription: "Forest resources and land use.",

    },
    ru: {
        pageTitle: "Страна:",
        selectedCountry: "Выбранная страна:",
        loading: "Загрузка...",
        noData: "Нет данных",
        categoryEconomyDescription: "Ключевые экономические показатели страны.",
        categoryDemographyDescription: "Численность населения и уровень урбанизации.",
        categorySocialDescription: "Качество жизни, здоровье и доступ к образованию.",
        categoryEcologyDescription: "Экологическое воздействие и климатические показатели.",
        categoryEnvironmentDescription: "Лесные ресурсы и использование земель.",

    },
} as const;

export type Language = keyof typeof translations;
