// Компонент отображает значение индикатора для конкретной страны

import { useWorldBankIndicator } from "../api/useWorldBankIndicator";
import { normalizeWorldBankSeries } from "../utils/Formatting";
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
        const series = normalizeWorldBankSeries(data); // все доступные годы, отсортированы

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
            className="bg-slate-800 p-4 rounded-xl shadow hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}

        >
            <p className="text-sm text-slate-400 mb-1">{label}</p>

            {isLoading && <p className="text-slate-500 text-sm">Loading...</p>}
            {error && <p className="text-red-400 text-sm">Error loading data</p>}

            {!isLoading && !error && (
                <div className="mt-2 flex items-end justify-between">

                    <div>
                        <p className="text-2xl font-semibold text-emerald-300">
                            {value !== null ? formatIndicatorValue(indicatorId, value) : "-"}
                        </p>
                        <p className="text-sm text-slate-400 mt-1">
                            {year !== null ? `Year: ${year}` : "No data"}
                        </p>
                    </div>

                    {sparkPoints && (
                        <svg
                            width={sparkWidth}
                            height={sparkHeight}
                            viewBox={`0 0 ${sparkWidth} ${sparkHeight}`}
                            className="ml-3 text-emerald-400"
                        >
                            <polyline
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                points={sparkPoints}
                            />
                        </svg>
                    )}
                </div>
            )}
        </motion.div>
    );
}
