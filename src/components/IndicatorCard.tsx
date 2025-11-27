import { useWorldBankIndicator } from "../api/useWorldBankIndicator";

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


    return (
        <div className="bg-slate-800 p-4 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-sm text-slate-400 mb-1">{label}</p>

            {isLoading && <p className="text-slate-500 text-sm">Loading...</p>}
            {error && <p className="text-red-400 text-sm">Error loading data</p>}

            {!isLoading && !error && (
                <>
                    <p className="text-2xl font-semibold text-emerald-300">
                        {value !== null ? value : "—"}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                        {year !== null ? `Year: ${year}` : "No data"}
                    </p>
                </>
            )}
        </div>
    );
}
