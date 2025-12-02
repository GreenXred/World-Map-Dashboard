// Большой график 

import { useState } from "react";
import { INDICATORS } from "../config/Indicators";
import { useWorldBankIndicator } from "../api/useWorldBankIndicator";
import { normalizeWorldBankSeries } from "../utils/worldBankSeries";

import {
    LineChart,           // Контейнер графика
    Line,                // Линия графика
    XAxis,               // Ось X
    YAxis,               // Ось Y
    Tooltip,             // Всплывающая подсказка
    ResponsiveContainer, // Адаптивная ширина
    CartesianGrid        // Сетка
} from "recharts";

type CountryChartProps = {
    countryCode: string;
    compareCode?: string; // необязательный проп для второй страны
};

export default function CountryChart({ countryCode, compareCode }: CountryChartProps) {
    const [selectedIndicator, setSelectedIndicator] = useState("NY.GDP.PCAP.CD");
    const indicatorId = selectedIndicator;

    // основная страна
    const mainCountry = useWorldBankIndicator(countryCode, indicatorId);

    // вторая страна: хук вызываем всегда, если compareCode нет, то подставим ту же страну
    const compare = useWorldBankIndicator(
        compareCode ? compareCode : countryCode,
        indicatorId
    );

    const data = mainCountry.data;
    const isLoading = mainCountry.isLoading;
    const error = mainCountry.error;

    // Основная страна
    const chartData = normalizeWorldBankSeries(data);

    // Страна для сравнения
    let compareChartData: { year: number; value: number }[] = [];

    if (compareCode && compare.data) {
        compareChartData = normalizeWorldBankSeries(compare.data);
    }

    // Объединённые данные для графика // TODO вынести всю функцию в компонент?
    let mergedData = chartData.map((a) => ({
        year: a.year,
        value1: a.value, // значения основной страны
    }));

    if (compareChartData.length > 0) {
        const map = new Map<number, any>();

        //  взять основную страну
        for (const item of mergedData) {
            map.set(item.year, { ...item });
        }

        // добавление compare страны
        for (const item of compareChartData) {
            if (map.has(item.year)) {
                map.get(item.year).value2 = item.value;
            } else {
                map.set(item.year, { year: item.year, value2: item.value });
            }
        }

        // преобразование map снова в массив
        mergedData = Array.from(map.values()).sort((a, b) => a.year - b.year);
    }

    return (
        <div className="w-full max-w-4xl mt-10 bg-slate-800/60 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-slate-100">
                The history of the indicator for the country {countryCode}
                {compareCode ? ` vs ${compareCode}` : ""}
            </h2>

            {/* Выбор индикатора */}
            <div className="mb-4">
                <select
                    value={selectedIndicator}
                    onChange={(e) => setSelectedIndicator(e.target.value)}
                    className="bg-slate-800 border border-slate-600 text-slate-100 p-2 rounded-lg"
                >
                    {INDICATORS.map((ind) => (
                        <option key={ind.id} value={ind.id}>
                            {ind.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* График */}
            <div className="mt-4 min-h-[80px]">
                {isLoading && (
                    <p className="text-slate-400 text-sm">Loading...</p>
                )}

                {error && (
                    <p className="text-red-400 text-sm">
                        Error loading data.
                    </p>
                )}

                {!isLoading && !error && chartData.length === 0 && (
                    <p className="text-slate-400 text-sm">
                        No data available for this indicator.
                    </p>
                )}

                {!isLoading && !error && chartData.length > 0 && (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mergedData}>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                            <XAxis dataKey="year" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #334155",
                                }}
                                labelStyle={{ color: "#e2e8f0" }}
                                itemStyle={{ color: "#a5f3fc" }}
                            />
                            {/* Основаня линия */}
                            <Line
                                type="monotone"
                                dataKey="value1"
                                stroke="#34d399"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6 }}
                            />
                            {/* Дополнительная линия, если активировано сравнение */}
                            {compareCode && compareChartData.length > 0 && (
                                <Line
                                    type="monotone"
                                    dataKey="value2"
                                    stroke="#60a5fa"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}