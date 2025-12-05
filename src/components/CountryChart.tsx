// src/components/CountryChart.tsx

import { useState } from "react";
import { INDICATORS } from "../config/Indicators";
import { useWorldBankIndicator } from "../api/useWorldBankIndicator";
import { formatYAxisTick } from "../utils/Formatting";
import { useTranslation } from "react-i18next";
import { useCountryIndicator } from "../hooks/useCountryIndicator";
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
    compareCode?: string;
    compareOptions: { code: string; name: string }[];
    onChangeCompare: (code: string | undefined) => void;
};

// Главный компонент графика
export default function CountryChart({ countryCode, compareCode, compareOptions, onChangeCompare }: CountryChartProps) {
    const { t } = useTranslation();

    // Выбранный индикатор
    const [selectedIndicator, setSelectedIndicator] = useState(
        INDICATORS[0].id
    );

    // Основная страна
    const main = useWorldBankIndicator(countryCode, selectedIndicator);

    // Хук всегда вызываем, но данные будут использоваться только если compareCode реально выбран
    const compare = useWorldBankIndicator(
        compareCode ? compareCode : countryCode,
        selectedIndicator
    );

    const data = main.data;
    const isLoading = main.isLoading;
    const error = main.error;

    const { mergedData, hasCompareData } = useCountryIndicator(
        data,
        compareCode ? compare.data : undefined
    );

    return (
        <div
            className="
                w-full max-w-5xl mt-10
                rounded-3xl
                border border-emerald-400/15
                bg-slate-900/40
                bg-gradient-to-b from-emerald-500/5 via-slate-900/40 to-slate-950/90
                backdrop-blur-2xl
                shadow-[0_24px_80px_rgba(0,0,0,0.85)]
                px-6 py-6 md:px-8 md:py-7
            "
        >

            {/* Заголовок */}
            <h2 className="text-lg md:text-xl font-semibold tracking-tight text-slate-50 mb-5">
                {compareCode
                    ? t("chart.titleCompare", { code1: countryCode, code2: compareCode })
                    : t("chart.title", { code: countryCode })}
            </h2>

            {/* Два селекта в строку */}
            <div className="flex flex-wrap items-end gap-3 md:gap-4 mb-4 pl-26">

                {/* Селект индикатора */}
                <div className="flex flex-col flex-1 min-w-[230px] max-w-sm">
                    <label className="text-[11px] font-medium text-slate-400 mb-1">{t("chart.indicator")}</label>

                    <select
                        value={selectedIndicator}
                        onChange={(e) => setSelectedIndicator(e.target.value)}
                        className="h-9 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-50
                                   focus:outline-none focus:ring-2 focus:ring-emerald-400/70 focus:border-emerald-400/60 transition"
                    >
                        {INDICATORS.map((ind) => (
                            <option key={ind.id} value={ind.id}>
                                {t(ind.label)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Селект сравнения */}
                <div className="flex flex-col flex-1 min-w-[230px] max-w-sm">
                    <label className="text-[11px] font-medium text-slate-400 mb-1">{t("chart.compareWith")}</label>

                    <select
                        className="h-9 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-50
                                   focus:outline-none focus:ring-2 focus:ring-emerald-400/70 focus:border-emerald-400/60 transition"
                        value={compareCode ?? ""}
                        onChange={(e) =>
                            onChangeCompare(
                                e.target.value === "" ? undefined : e.target.value
                            )
                        }
                    >
                        <option value="">{t("chart.noComparison")}</option>

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
                    <p className="text-slate-400 text-sm">
                        {t("chart.loading")}
                    </p>
                )}

                {error && (
                    <p className="text-red-400 text-sm">
                        {t("chart.error")}
                    </p>
                )}

                {!isLoading && !error && mergedData.length === 0 && (
                    <p className="text-slate-400 text-sm">
                        {t("chart.noData")}
                    </p>
                )}

                {!isLoading && !error && mergedData.length > 0 && (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mergedData}>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

                            <XAxis dataKey="year" stroke="#94a3b8" />

                            <YAxis
                                stroke="#94a3b8"
                                tickFormatter={formatYAxisTick}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #334155"
                                }}
                                labelStyle={{ color: "#e2e8f0" }}
                                itemStyle={{ color: "#a5f3fc" }}
                            />

                            {/* Линия основной страны */}
                            <Line
                                type="monotone"
                                dataKey="value1"
                                name={countryCode}
                                stroke="#34d399"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6 }}
                            />

                            {/* Линия сравнения (если есть данные) */}
                            {compareCode && hasCompareData && (
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
        </div>
    );
}
