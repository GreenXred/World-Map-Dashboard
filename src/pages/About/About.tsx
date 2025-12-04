import React from "react";

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Заголовок страницы */}
                <header className="mb-10">
                    <p className="text-xs uppercase tracking-[0.18em] text-emerald-400/80 mb-2">
                        About this project
                    </p>
                    <h1 className="text-3xl md:text-4xl font-semibold mb-3">
                        World Map Dashboard
                    </h1>
                    <p className="text-sm md:text-base text-slate-400 max-w-2xl">
                        This is a learning project that explores how to combine public data
                        (World Bank Open Data), modern frontend tools and clean UI design
                        into a single, interactive dashboard.
                    </p>
                </header>

                <div className="space-y-6">
                    {/* Блок: Overview */}
                    <section
                        className="
                            rounded-3xl
                            border border-slate-800/80
                            bg-slate-900/40
                            bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-950/90
                            backdrop-blur-2xl
                            shadow-[0_20px_70px_rgba(0,0,0,0.85)]
                            px-5 py-5 md:px-6 md:py-6
                        "
                    >
                        <h2 className="text-lg md:text-xl font-semibold mb-2">
                            Project overview
                        </h2>
                        <p className="text-sm text-slate-300 mb-3">
                            The main idea of this dashboard is to make global statistics more
                            tangible. Instead of reading static tables, you can explore
                            countries on an interactive map, open a dedicated page for each
                            one and see how key indicators evolved over time.
                        </p>
                        <p className="text-xs md:text-sm text-slate-400">
                            The project is intentionally focused on a small, curated set of
                            indicators split into categories like Economy, Demography, Quality
                            of life and Environment. This makes the interface easier to read
                            and the charts easier to compare.
                        </p>
                    </section>

                    {/* Блок: Data sources */}
                    <section
                        className="
                            rounded-3xl
                            border border-emerald-400/20
                            bg-slate-900/40
                            bg-gradient-to-br from-emerald-500/10 via-slate-900/40 to-slate-950/90
                            backdrop-blur-2xl
                            shadow-[0_20px_70px_rgba(0,0,0,0.9)]
                            px-5 py-5 md:px-6 md:py-6
                        "
                    >
                        <h2 className="text-lg md:text-xl font-semibold mb-2">
                            Data sources
                        </h2>
                        <p className="text-sm text-slate-300 mb-3">
                            All numeric indicators are loaded from the{" "}
                            <span className="text-emerald-300">
                                World Bank Open Data API
                            </span>
                            . Each indicator is identified by a stable code (for example,
                            <code className="px-1.5 py-0.5 mx-1 rounded bg-slate-900/70 text-xs">
                                NY.GDP.PCAP.CD
                            </code>
                            for GDP per capita).
                        </p>
                        <ul className="text-xs md:text-sm text-slate-300 space-y-1.5 mb-3 list-disc list-inside">
                            <li>GDP per capita (current US$)</li>
                            <li>Unemployment rate (% of total labor force)</li>
                            <li>Total population and urban population share</li>
                            <li>Life expectancy and basic education coverage</li>
                            <li>Access to safe water, CO₂ emissions and energy use</li>
                        </ul>
                        <p className="text-xs md:text-sm text-slate-400">
                            Not all indicators are available for every country and every year.
                            When data is missing, some charts may have gaps or shorter lines –
                            this reflects the real state of the dataset.
                        </p>
                    </section>

                    {/* Блок: Data loading & caching */}
                    <section
                        className="
                            rounded-3xl
                            border border-sky-400/20
                            bg-slate-900/40
                            bg-gradient-to-br from-sky-500/10 via-slate-900/40 to-slate-950/90
                            backdrop-blur-2xl
                            shadow-[0_20px_70px_rgba(0,0,0,0.9)]
                            px-5 py-5 md:px-6 md:py-6
                        "
                    >
                        <h2 className="text-lg md:text-xl font-semibold mb-2">
                            Data loading & caching
                        </h2>
                        <p className="text-sm text-slate-300 mb-3">
                            Network requests are handled by{" "}
                            <span className="text-sky-300">React Query</span>. Each indicator
                            for each country is fetched only once and then cached in memory.
                        </p>
                        <p className="text-xs md:text-sm text-slate-300 mb-3">
                            This means the first visit to a country page or a new indicator
                            may take a couple of seconds while data is being loaded from the
                            World Bank API. Subsequent visits reuse cached data and feel
                            almost instant.
                        </p>
                        <p className="text-xs md:text-sm text-slate-400">
                            The dashboard also normalizes and sorts time series before they
                            reach the charts. This is done in a separate utility layer so that
                            the visual components stay as simple as possible.
                        </p>
                    </section>

                    {/* Блок: Tech stack */}
                    <section
                        className="
                            rounded-3xl
                            border border-purple-400/20
                            bg-slate-900/40
                            bg-gradient-to-br from-purple-500/10 via-slate-900/40 to-slate-950/90
                            backdrop-blur-2xl
                            shadow-[0_20px_70px_rgba(0,0,0,0.9)]
                            px-5 py-5 md:px-6 md:py-6
                        "
                    >
                        <h2 className="text-lg md:text-xl font-semibold mb-3">
                            Tech stack
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm text-slate-300">
                            <div className="space-y-1.5">
                                <p>
                                    <span className="text-slate-400">Frontend:</span> React,
                                    TypeScript, Vite
                                </p>
                                <p>
                                    <span className="text-slate-400">State:</span> Redux Toolkit
                                    (selected country and shared UI state)
                                </p>
                                <p>
                                    <span className="text-slate-400">Data fetching:</span> React
                                    Query (API calls & caching)
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <p>
                                    <span className="text-slate-400">Charts:</span> Recharts with
                                    normalized time series
                                </p>
                                <p>
                                    <span className="text-slate-400">Styling:</span> Tailwind CSS
                                    + subtle glassmorphism
                                </p>
                                <p>
                                    <span className="text-slate-400">Animations:</span> Framer
                                    Motion for small UI transitions
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Блок: Limitations & future work */}
                    <section
                        className="
                            rounded-3xl
                            border border-slate-800/80
                            bg-slate-900/40
                            backdrop-blur-2xl
                            shadow-[0_18px_60px_rgba(0,0,0,0.85)]
                            px-5 py-5 md:px-6 md:py-6
                        "
                    >
                        <h2 className="text-lg md:text-xl font-semibold mb-2">
                            Limitations & future ideas
                        </h2>
                        <ul className="text-xs md:text-sm text-slate-300 space-y-1.5 mb-3 list-disc list-inside">
                            <li>
                                Data quality and freshness fully depend on the World Bank API.
                            </li>
                            <li>
                                Some indicators are missing for certain countries or years,
                                which leads to gaps in the charts.
                            </li>
                            <li>
                                Only a small set of indicators is included to keep the UI
                                readable.
                            </li>
                        </ul>
                        <p className="text-xs md:text-sm text-slate-400">
                            As a next step, the dashboard could be extended with UN SDG
                            indicators, more advanced comparison tools or different visual
                            layouts (for example, regional views or thematic dashboards).
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;
