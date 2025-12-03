// Нормализация ответа World Bank в массиве { year, value } по возрастанию года

export function normalizeWorldBankSeries(rawData: any): { year: number; value: number }[] { // TODO типизировать
    // Если данных нет или формат другой — возвращаем пустой массив, чтобы не ломать рендер
    if (!rawData || !Array.isArray(rawData[1])) {
        return [];
    }

    return rawData[1]
        .filter((item) => item && item.value !== null) // убираем записи без значения
        .map((item) => ({
            year: Number(item.date),   // "2024" -> 2024
            value: Number(item.value), // приводим к числу
        }))
        .sort((a, b) => a.year - b.year); // упорядочиваем по годам: от старых к новым
}

// Базовые форматеры под разные типы чисел

// крупные числа, с разделением тысяч
function formatCurrency(value: number): string {
    return value.toLocaleString(undefined, {
        maximumFractionDigits: 1,
    });
}

// Отображение процента
function formatPercent(value: number): string {
    return value.toFixed(1) + "%";
}

// население приводим к миллионам
function formatPopulation(value: number): string {
    return (value / 1_000_000).toFixed(1) + "M";
}
// Целое число для данных по средней продолжительности жизни
function formatYears(value: number): string {
    return value.toFixed();
}

// рождаемость: дети на одну женщину
function formatBirthsPerWoman(value: number): string {
    return value.toFixed(2);
}

// Парниковые испарения в килотоннах - показываем в млн тонн
function formatKtCO2eq(value: number): string {
    const megaTons = value / 1_000; // 1000 kt = 1 Mt
    return megaTons.toFixed(1) + " Mt";
}

// Загрязненность воздуха
function formatMicrograms(value: number): string {
    return value.toFixed(1);
}

// Зеленая энергия
function formatEnergyPercent(value: number): string {
    return value.toFixed(1) + "%";
}

// Главная функция — по id индикатора выбирается формат

export function formatIndicatorValue(indicatorId: string, value: number): string {
    switch (indicatorId) {
        // ECONOMY
        case "NY.GDP.PCAP.CD":
            return formatCurrency(value);

        case "SL.UEM.TOTL.ZS":
            return formatPercent(value);

        // DEMOGRAPHY
        case "SP.POP.TOTL":
            return formatPopulation(value);

        case "SP.URB.TOTL.IN.ZS":
            return formatPercent(value);

        // QUALITY OF LIFE
        case "SP.DYN.LE00.IN":
            return formatYears(value);

        case "SP.DYN.TFRT.IN":
            return formatBirthsPerWoman(value);

        // SOCIAL SPHERE
        case "SE.PRM.NENR":
        case "SE.TER.ENRR":
            return formatPercent(value);

        // ECOLOGY
        case "EN.ATM.GHGT.KT.CE":
            return formatKtCO2eq(value);

        case "EN.ATM.PM25.MC.M3":
            return formatMicrograms(value);

        // ENVIRONMENT
        case "AG.LND.FRST.ZS":
        case "EG.FEC.RNEW.ZS":
            return formatEnergyPercent(value);

        // Fallback
        default:
            return value.toFixed(1);
    }
}

