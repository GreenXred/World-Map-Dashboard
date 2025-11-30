import RAW from "./iso3.js";

// Объект для быстрого поиска ISO3 → имя страны
export const COUNTRY_NAMES: Record<string, string> = {};

// Разбираем строку RAW в объект
RAW.trim().split("\n").forEach((line: string) => {
    const [code, ...nameParts] = line.trim().split(/\s+/);
    const name = nameParts.join(" ");
    COUNTRY_NAMES[code] = name;
});

