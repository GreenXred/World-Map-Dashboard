// Компонент отображает значение индикатора для конкретной страны
//тянет данные одного индикатора, показывает число + мини-график.

import { useWorldBankIndicator } from "../api/useWorldBankIndicator";
import { normalizeWorldBank } from "../utils/Formatting";
import { formatIndicatorValue } from "../utils/Formatting";

import { motion } from "framer-motion";

type IndicatorCardProps = {
    label: string;
    indicatorId: string;
    countryCode: string;
};

export default function IndicatorCard({ label, indicatorId, countryCode }: IndicatorCardProps) {
    const { data, isLoading, error } = useWorldBankIndicator(countryCode, indicatorId);

    let year: string | null = null;
    let value: number | null = null;

    if (data && Array.isArray(data[1])) {
        for (const entry of data[1]) {
            if (entry && entry.value !== null) {
                year = entry.date;
                value = entry.value;
                break; // нашли первую нормальную запись — выходим из цикла. Так как конкретный год могут быть не все данные
            }
        }
    }

    // Массив для sparkline (мини-графика)

    let sparkData: { year: number; value: number }[] = [];

    if (data) {
        // Нормализуем все годы
        const series = normalizeWorldBank(data); // все доступные годы, отсортированы

        // Последние 20 лет для мини-тренда
        sparkData = series.slice(-20);
    }

    // размеры мини-графика в пикселях
    const sparkWidth = 80;
    const sparkHeight = 30;

    let sparkPoints = "";

    if (sparkData.length > 1) {
        const values = sparkData.map((p) => p.value);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min || 1; // защита от деления на 0

        sparkPoints = sparkData
            .map((point, index) => {
                const x =
                    (index / (sparkData.length - 1)) * sparkWidth; // от 0 до ширины
                const normY = (point.value - min) / range;        // от 0 до 1
                const y = sparkHeight - normY * sparkHeight;      // переворачиваем ось Y

                return `${x},${y}`;
            })
            .join(" ");
    }

    return (
        <motion.div
            className="
                relative overflow-hidden
                rounded-2xl
                border border-emerald-400/10
                bg-slate-900/40
                bg-gradient-to-br from-emerald-500/5 via-slate-900/40 to-slate-950/90
                backdrop-blur-xl
                shadow-[0_18px_50px_rgba(0,0,0,0.75)]
                p-4
                transition
                hover:border-emerald-400/40
                hover:shadow-[0_24px_70px_rgba(0,0,0,0.9)]
                hover:-translate-y-0.5
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
        >
            <p className="text-xs font-medium text-slate-300 tracking-wide mb-1">
                {label}
            </p>
            <div className="h-px w-12 mb-2 bg-gradient-to-r from-emerald-400/70 via-emerald-300/40 to-transparent" />

            {isLoading && <p className="text-slate-500 text-sm">Loading...</p>}
            {error && <p className="text-red-400 text-sm">Error loading data</p>}

            {!isLoading && !error && (
                <div className="mt-3 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-2xl font-semibold text-emerald-300">
                            {value !== null ? formatIndicatorValue(indicatorId, value) : "-"}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            {year !== null ? `Year: ${year}` : "No data"}
                        </p>
                    </div>

                    {sparkPoints && (
                        <div 
                            className="
                                h-12 w-28 
                                rounded-xl 
                                bg-slate-950/40 
                                border border-slate-800/80 
                                flex items-center 
                                justify-center">
                            <svg
                                width={sparkWidth}
                                height={sparkHeight}
                                viewBox={`0 0 ${sparkWidth} ${sparkHeight}`}
                                className="text-emerald-400"
                            >
                                <polyline
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    points={sparkPoints}
                                />
                            </svg>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}
