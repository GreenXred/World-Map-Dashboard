// Компонент отображает значение индикатора для конкретной страны

import { useWorldBankIndicator } from "../api/useWorldBankIndicator";
import { motion } from "framer-motion";


type IndicatorCardProps = {
    label: string;
    indicatorId: string;
    countryCode: string;
};

// Хелперы форматирования для разных типов индикаторов

function formatCurrency(value: number): string { // Валютные показатели: разделение тысяч
    return value.toLocaleString(undefined, {
        maximumFractionDigits: 1,
    });
}

function formatPercent(value: number): string { // Процентные показатели
    return value.toFixed(1) + "%";
}

function formatPopulation(value: number): string { // Население
    // Население: в млн с 1 знаком
    return (value / 1_000_000).toFixed(1) + "M";
}

function formatYears(value: number): string { // Ожидаемое число лет
    return value.toFixed(1);
}

function formatTons(value: number): string { // Выбросы CO2 в тоннах на душу
    return value.toFixed(1);
}

// Форматирование данных для отображения

function formatValue(indicatorId: string, value: number): string {
    switch (indicatorId) {
        // Экономика 
        case "NY.GDP.PCAP.CD":
            return formatCurrency(value);

        case "SL.UEM.TOTL.ZS":
            return formatPercent(value);

        // Демография 
        case "SP.POP.TOTL":
            return formatPopulation(value);

        case "SP.URB.TOTL.IN.ZS":
            return formatPercent(value);

        // Социальная сфера
        case "SP.DYN.LE00.IN":
            return formatYears(value);

        case "SE.PRM.NENR":
            return formatPercent(value);

        // Экология
        case "EN.ATM.CO2E.PC":
            return formatTons(value);

        case "AG.LND.FRST.ZS":
            return formatPercent(value);

        // Fallback (если новый индикатор не добавлен в хелперы)
        default:
            return value.toFixed(1);
    }
}



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

    let sparkData: { year: string; value: number }[] = [];

    if (data && Array.isArray(data[1])) {
        sparkData = data[1]
            .filter((item) => item.value !== null)      // убираем пустые значения
            .slice(0, 20)                               // берём, например, последние 20 записей
            .map((item) => ({
                year: item.date,
                value: item.value as number,
            }))
            .reverse();                                 // разворачиваем: старые -> новые
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
                            {value !== null ? formatValue(indicatorId, value) : "-"}
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
