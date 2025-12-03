// Большой график 

import { useState } from "react";
import { INDICATORS } from "../config/Indicators";
import { useWorldBankIndicator } from "../api/useWorldBankIndicator";
import { normalizeWorldBankSeries } from "../utils/Formatting";

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
    compareCode?: string; // код страны для сравнения
    compareOptions: { code: string; name: string }[]; // список стран для селекта
    onChangeCompare: (code: string | undefined) => void; // хэндлер смены страны
};

export default function CountryChart({ countryCode, compareCode, compareOptions, onChangeCompare }: CountryChartProps) {
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

    // Для корректного отображения больших числен по оси Y
    function formatYAxisTick(value: number): string {
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

    return (
        <div className="w-full max-w-4xl mt-10 bg-slate-900/70 border border-slate-700/70 rounded-2xl p-6 md:p-7 shadow-lg shadow-slate-900/30">
            {/* Заголовок */}
            <h2 className="text-lg md:text-xl font-semibold tracking-tight text-slate-50 mb-5">
                The history of the indicator for the country {countryCode}
                {compareCode ? ` vs ${compareCode}` : ""}
            </h2>

            {/* Два селекта */}
            <div className="flex flex-wrap items-end gap-3 md:gap-4 mb-4 pl-12">

                {/* Селект индикатора */}
                <div className="flex flex-col flex-1 min-w-[230px] max-w-sm">
                    <label className="text-[11px] font-medium text-slate-400 mb-1">
                        Indicator
                    </label>
                    <select
                        value={selectedIndicator}
                        onChange={(e) => setSelectedIndicator(e.target.value)}
                        className="h-9 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-50
                   focus:outline-none focus:ring-2 focus:ring-emerald-400/70 focus:border-emerald-400/60
                   transition"
                    >

                        {INDICATORS.map((ind) => (
                            <option key={ind.id} value={ind.id}>
                                {ind.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Селект сравнения */}
                <div className="flex flex-col flex-1 min-w-[230px] max-w-sm">
                    <label className="text-[11px] font-medium text-slate-400 mb-1">
                        Compare with
                    </label>
                    <select
                        className="h-9 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-50
                   focus:outline-none focus:ring-2 focus:ring-emerald-400/70 focus:border-emerald-400/60
                   transition"
                        value={compareCode ?? ""}
                        onChange={(e) =>
                            onChangeCompare(
                                e.target.value === "" ? undefined : e.target.value
                            )
                        }
                    >
                        <option value="">No comparison</option>
                        {compareOptions.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.name} ({c.code})
                            </option>
                        ))}
                    </select>
                </div>
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
                            <YAxis stroke="#94a3b8 " tickFormatter={formatYAxisTick} />
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
                                name={countryCode}
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
                                    name={compareCode}
                                    stroke="#60a5fa"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div >
    );
}