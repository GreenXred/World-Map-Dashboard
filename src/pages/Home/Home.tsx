import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleGoToMap = () => {
        navigate("/map");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Верхний блок с двумя колонками */}
                <div className="grid gap-12 grid-cols-2 items-center">
                    {/* Левая колонка: текст и кнопка */}
                    <div className="space-y-6">
                        <h1 className="text-3xl text-4xl font-bold leading-tight">
                            Explore the world through data
                        </h1>

                        <p className="text-slate-300 text-sm text-base">
                            This dashboard lets you explore key indicators for countries
                            around the world. Use the interactive map to select a country,
                            see its metrics by category, and follow trends over time.
                        </p>

                        <p className="text-slate-400 text-sm text-base">
                            Each indicator shows a 20-year mini trend and a full historical
                            chart. You can also compare two countries on the same chart to
                            see how their paths differ, as well as get the latest up-to-date data.
                        </p>

                        <button
                            onClick={handleGoToMap}
                            className="inline-flex items-center px-5 py-2.5 rounded-xl bg-emerald-500/90 hover:bg-emerald-400 transition text-sm font-medium shadow-lg shadow-emerald-500/20"
                        >
                            Go to map
                        </button>
                    </div>

                    {/* Правая колонка: демо-карточка страны */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-emerald-500/10">
                        <div className="flex items-baseline justify-between mb-4">
                            <div>
                                <div className="text-xs uppercase tracking-wide text-slate-400">
                                    Country demo
                                </div>
                                <div className="text-lg font-semibold">Brazil (BRA)</div>
                            </div>
                            <div className="text-xs text-slate-400">
                                Example view
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Индикатор GDP */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="text-xs text-slate-400">
                                        GDP per capita
                                    </div>
                                    <div className="text-xs text-emerald-400">
                                        (20 years)
                                    </div>
                                </div>
                                <div className="flex items-end justify-between">
                                    <div className="text-sm font-semibold">
                                        $10 280
                                    </div>
                                    {/* Простая псевдо-линия тренда */}
                                    <div className="h-8 w-32 rounded-md bg-gradient-to-r from-emerald-500/20 via-emerald-400/40 to-emerald-500/20 relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-70">
                                            <svg
                                                viewBox="0 0 100 40"
                                                className="w-full h-full"
                                                preserveAspectRatio="none"
                                            >
                                                <polyline
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    className="text-emerald-400"
                                                    points="0,30 20,28 40,26 55,24 70,20 85,16 100,12"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Индикатор Population */}
                            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="text-xs text-slate-400">
                                        Population
                                    </div>
                                    <div className="text-xs text-sky-400">
                                        (20 years)
                                    </div>
                                </div>
                                <div className="flex items-end justify-between">
                                    <div className="text-sm font-semibold">
                                        212 M
                                    </div>
                                    <div className="h-8 w-32 rounded-md bg-gradient-to-r from-sky-500/20 via-sky-400/40 to-sky-500/20 relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-70">
                                            <svg
                                                viewBox="0 0 100 40"
                                                className="w-full h-full"
                                                preserveAspectRatio="none"
                                            >
                                                <polyline
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    className="text-sky-400"
                                                    points="0,34 15,33 30,32 45,30 60,28 80,26 100,24"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Подпись снизу */}
                        <div className="mt-4 text-[11px] text-slate-500">
                            This is a static demo card to illustrate how indicators and
                            mini trends look on the country page.
                        </div>
                    </div>
                </div>
                {/* Фичи */}
                <div className="mt-20">
                    <h2 className="text-2xl font-bold mb-8">What you can do</h2>

                    <div className="grid gap-6 grid-cols-3">
                        {/* Фича  1 */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-emerald-400/40 transition">
                            <div className="text-3xl mb-3">🗺️</div>
                            <h3 className="font-semibold mb-2">Interactive Map</h3>
                            <p className="text-slate-400 text-sm">
                                Click on any country to open its dashboard, explore all available
                                indicators and see real data trends.
                            </p>
                        </div>

                        {/* Фича 2 */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-sky-400/40 transition">
                            <div className="text-3xl mb-3">📈</div>
                            <h3 className="font-semibold mb-2">Indicator Trends</h3>
                            <p className="text-slate-400 text-sm">
                                Each indicator shows a 20-year mini trend and a full historical chart
                                with normalized values.
                            </p>
                        </div>

                        {/* Фича 3 */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-purple-400/40 transition">
                            <div className="text-3xl mb-3">⚖️</div>
                            <h3 className="font-semibold mb-2">Compare Countries</h3>
                            <p className="text-slate-400 text-sm">
                                Add a second country to the chart and compare long-term dynamics on
                                any indicator available in the dataset.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Как это работает */}
                <div className="mt-20 border-t border-slate-800 pt-10">
                    <h2 className="text-2xl font-bold mb-6">How it works</h2>
                    <p className="text-slate-400 text-sm max-w-2xl mb-8">
                        The dashboard is built around a simple flow: pick a country, explore its
                        indicators by category, and then compare it with another country on the same
                        chart.
                    </p>

                    <div className="space-y-5">
                        {/* Шаг 1 */}
                        <div className="flex gap-4">
                            <div className="mt-1 h-7 w-7 rounded-full bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-xs font-semibold text-emerald-300">
                                1
                            </div>
                            <div>
                                <div className="font-semibold text-sm">Open the map and choose a country</div>
                                <div className="text-slate-400 text-sm">
                                    Go to the <span className="font-medium text-slate-200">Map</span> page
                                    and click on any country. This will open a dedicated dashboard for that
                                    country.
                                </div>
                            </div>
                        </div>

                        {/* Шаг 2 */}
                        <div className="flex gap-4">
                            <div className="mt-1 h-7 w-7 rounded-full bg-sky-500/15 border border-sky-400/60 flex items-center justify-center text-xs font-semibold text-sky-300">
                                2
                            </div>
                            <div>
                                <div className="font-semibold text-sm">Explore indicators by category</div>
                                <div className="text-slate-400 text-sm">
                                    On the country page, indicators are grouped into categories like
                                    Economy, Demography or Environment. Each card shows the latest value
                                    and a 20-year mini trend.
                                </div>
                            </div>
                        </div>

                        {/* Шаг 3 */}
                        <div className="flex gap-4">
                            <div className="mt-1 h-7 w-7 rounded-full bg-purple-500/15 border border-purple-400/60 flex items-center justify-center text-xs font-semibold text-purple-300">
                                3
                            </div>
                            <div>
                                <div className="font-semibold text-sm">Compare countries on the chart</div>
                                <div className="text-slate-400 text-sm">
                                    Use the comparison dropdown under the main chart to add a second
                                    country and see how their trajectories differ over time.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
