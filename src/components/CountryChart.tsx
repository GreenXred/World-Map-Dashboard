// Большой график 

import { useState } from "react";
import { INDICATORS } from "../config/Indicators";
import { useWorldBankIndicator } from "../api/useWorldBankIndicator";

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
};

export default function CountryChart({ countryCode }: CountryChartProps) {
    const [selectedIndicator, setSelectedIndicator] = useState("NY.GDP.PCAP.CD");
    const indicatorId = selectedIndicator;

    const { data, isLoading, error } = useWorldBankIndicator(countryCode, indicatorId);

    let chartData: { year: string; value: number | null }[] = [];

    if (data && Array.isArray(data[1])) {
        chartData = data[1]
            .filter(entry => entry.value !== null)
            .map(entry => ({
                year: entry.date,
                value: entry.value
            }))
            .reverse(); // чтобы график шел от старого к новому
    }

    return (
        <div className="w-full max-w-4xl mt-10 bg-slate-800/60 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-slate-100">
                The history of the indicator for the country {countryCode}
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
                        <LineChart data={chartData}>
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
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#34d399"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}