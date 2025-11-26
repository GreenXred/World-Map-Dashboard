type IndicatorCardProps = {
    label: string;
    value: number | null;
    year: string | null;
};

export default function IndicatorCard({ label, value, year }: IndicatorCardProps) {
    return (
        <div className="bg-slate-800 p-4 rounded-xl shadow hover:shadow-lg transition">
            <p>{label}</p>
            <p>{year}</p>
            <p>{value}</p>
        </div>
    );
}
