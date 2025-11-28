// Большой график 

type CountryChartProps = {
    countryCode: string;
};

export default function CountryChart({ countryCode }: CountryChartProps) {
    return (
        <div className="w-full max-w-4xl mt-10 bg-slate-800/60 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-slate-100">
                The history of the indicator for the country {countryCode}
            </h2>

            <p className="text-slate-400 text-sm">
                Здесь будет график
            </p>
        </div>
    );
}