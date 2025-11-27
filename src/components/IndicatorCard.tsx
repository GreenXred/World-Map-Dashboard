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

    // достаём последнюю запись
    if (data && Array.isArray(data[1]) && data[1].length > 0) {
        const lastEntry = data[1][0]; // самый свежий год
        year = lastEntry.date;
        value = lastEntry.value;
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
