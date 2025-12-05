import { useTranslation } from "react-i18next";


const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Заголовок страницы */}
                <header className="mb-10">
                    <p className="text-xs uppercase tracking-[0.18em] text-emerald-400/80 mb-2">
                        {t("about.header.label")}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-semibold mb-3">
                        {t("about.header.title")}
                    </h1>
                    <p className="text-sm md:text-base text-slate-400 max-w-2xl">
                        {t("about.header.subtitle")}
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
                            {t("about.overview.title")}
                        </h2>
                        <p className="text-sm text-slate-300 mb-3">
                            {t("about.overview.p1")}
                        </p>
                        <p className="text-xs md:text-sm text-slate-400">
                            {t("about.overview.p2")}
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
                            {t("about.data.title")}
                        </h2>
                        <p className="text-sm text-slate-300 mb-3">
                            {t("about.data.p1.beforeLink")}
                            <span className="text-emerald-300">
                                {t("about.data.api")}
                            </span>
                            {t("about.data.p1.afterLinkBeforeCode")}
                            <code className="px-1.5 py-0.5 mx-1 rounded bg-slate-900/70 text-xs">
                                NY.GDP.PCAP.CD
                            </code>
                            {t("about.data.p1.afterCode")}
                        </p>
                        <ul className="text-xs md:text-sm text-slate-300 space-y-1.5 mb-3 list-disc list-inside">
                            <li>{t("about.data.list1")}</li>
                            <li>{t("about.data.list2")}</li>
                            <li>{t("about.data.list3")}</li>
                            <li>{t("about.data.list4")}</li>
                            <li>{t("about.data.list5")}</li>
                        </ul>
                        <p className="text-xs md:text-sm text-slate-400">
                            {t("about.data.p2")}
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
                            {t("about.loading.title")}
                        </h2>
                        <p className="text-sm text-slate-300 mb-3">
                            {t("about.loading.p1").split("React Query")[0]}
                            <span className="text-sky-300">React Query</span>
                            {t("about.loading.p1").split("React Query")[1]}
                        </p>
                        <p className="text-xs md:text-sm text-slate-300 mb-3">
                            {t("about.loading.p2")}
                        </p>
                        <p className="text-xs md:text-sm text-slate-400">
                            {t("about.loading.p3")}
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
                            {t("about.tech.title")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm text-slate-300">
                            <div className="space-y-1.5">
                                <p>
                                    <span className="text-slate-400">{t("about.tech.frontend")}:</span>{" "}
                                    {t("about.tech.frontend.desc")}
                                </p>
                                <p>
                                    <span className="text-slate-400">{t("about.tech.state")}:</span>{" "}
                                    {t("about.tech.state.desc")}
                                </p>
                                <p>
                                    <span className="text-slate-400">{t("about.tech.data")}:</span>{" "}
                                    {t("about.tech.data.desc")}
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <p>
                                    <span className="text-slate-400">{t("about.tech.charts")}:</span>{" "}
                                    {t("about.tech.charts.desc")}
                                </p>
                                <p>
                                    <span className="text-slate-400">{t("about.tech.styling")}:</span>{" "}
                                    {t("about.tech.styling.desc")}
                                </p>
                                <p>
                                    <span className="text-slate-400">{t("about.tech.animations")}:</span>{" "}
                                    {t("about.tech.animations.desc")}
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
                            {t("about.limit.title")}
                        </h2>
                        <ul className="text-xs md:text-sm text-slate-300 space-y-1.5 mb-3 list-disc list-inside">
                            <li>{t("about.limit.list1")}</li>
                            <li>{t("about.limit.list2")}</li>
                            <li>{t("about.limit.list3")}</li>
                        </ul>
                        <p className="text-xs md:text-sm text-slate-400">
                            {t("about.limit.p1")}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;
