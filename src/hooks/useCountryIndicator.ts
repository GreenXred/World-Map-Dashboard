// Хук принимает ответы World Bank по основной и второй стране.
// Через normalizeWorldBankSeries нормализирует данные { year, value }.
// Склеивает эти два ряда по году в один массив:

import { useMemo } from "react";
import { normalizeWorldBank, type WorldBankIndicatorResponse } from "../utils/Formatting";

// Точка нормализованных данных World Bank
type NormalizedPoint = {
    year: number;
    value: number;
};

// Точка для графика сравнения двух стран
export type CountryChartPoint = {
    year: number;
    value1: number | null;      // основная страна
    value2?: number | null;     // вторая страна, если есть
};

export function useCountryIndicator(
    mainRaw: WorldBankIndicatorResponse | undefined,
    compareRaw?: WorldBankIndicatorResponse | undefined
) {

    const { mergedData, hasCompareData } = useMemo(() => {
        // Если нет данных основной страны — возвращаем пустой массив
        if (!mainRaw) {
            return { mergedData: [] as CountryChartPoint[], hasCompareData: false };
        }

        // Нормализуем ряды через helper
        const mainSeries: NormalizedPoint[] = normalizeWorldBank(mainRaw);
        const compareSeries: NormalizedPoint[] = compareRaw ? normalizeWorldBank(compareRaw) : [];

        // Базовый массив по основной стране
        let merged: CountryChartPoint[] = mainSeries.map((p) => ({
            year: p.year,
            value1: p.value,
        }));

        // Если есть вторая страна — добавляем её данные
        if (compareSeries.length > 0) {
            const map = new Map<number, CountryChartPoint>();

            // Основная страна
            for (const item of merged) {
                map.set(item.year, { ...item });
            }

            // Значения второй страны
            for (const item of compareSeries) {
                const existing = map.get(item.year);

                if (existing) {

                    existing.value2 = item.value;
                } else {
                    map.set(item.year, {
                        year: item.year,
                        value1: null,
                        value2: item.value,
                    });
                }
            }

            // обратно в массив + сортировка по году
            merged = Array.from(map.values()).sort((a, b) => a.year - b.year);
        }

        const hasCompare = merged.some(
            (p) => p.value2 !== undefined && p.value2 !== null
        );

        return { mergedData: merged, hasCompareData: hasCompare };
    }, [mainRaw, compareRaw]);

    return { mergedData, hasCompareData };
}
