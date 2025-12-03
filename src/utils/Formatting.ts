// Для одной точки временного ряда World Bank
export type WorldBankIndicatorPoint = {
    date: string;          // "2023"
    value: number | null;  // может быть null, если данных за год нет
};

// Для полного ответа World Bank по индикатору
export type WorldBankIndicatorResponse = [unknown, WorldBankIndicatorPoint[]];

// Нормализация ответа World Bank в массиве { year, value } по возрастанию года
export function normalizeWorldBank(
    rawData: WorldBankIndicatorResponse | undefined
): { year: number; value: number }[] {
    // 1) Если вообще нет данных — возвращаем пустой массив
    if (!rawData || !Array.isArray(rawData)) {
        return [];
    }

    const points = rawData[1];

    // 2) Если второй элемент не массив — тоже возвращаем []
    if (!Array.isArray(points)) {
        return [];
    }

    // 3) Фильтруем и приводим к нужному виду
    return points
        .filter((item) => item && item.value !== null && item.date)
        .map((item) => ({
            year: Number(item.date),
            value: Number(item.value),
        }))
        .sort((a, b) => a.year - b.year);
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

// Форматирование крупных чисел для оси Y на графиках
export function formatYAxisTick(value: number): string {
    const abs = Math.abs(value);

    if (abs >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    }

    if (abs >= 1_000_000) {
        return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }

    if (abs >= 1_000) {
        return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    }

    return value.toString();
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
