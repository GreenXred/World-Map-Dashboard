import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Home: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                            {t("home.hero.title")}
                        </h1>

                        <p className="text-slate-300 text-sm text-base">
                            {t("home.hero.subtitle")}
                        </p>

                        <p className="text-slate-400 text-sm text-base">
                            {t("home.hero.subtitle2")}
                        </p>

                        <button
                            onClick={handleGoToMap}
                            className="inline-flex items-center px-5 py-2.5 rounded-xl bg-emerald-500/90 hover:bg-emerald-400 transition text-sm font-medium shadow-lg shadow-emerald-500/20"
                        >
                            {t("home.hero.button")}
                        </button>
                    </div>

                    {/* Правая колонка: демо-карточка страны */}
                    <div className="
                            bg-slate-900/40
                            bg-gradient-to-br from-emerald-500/10 via-slate-900/40 to-slate-950/90
                            border border-emerald-400/20
                            rounded-3xl
                            backdrop-blur-2xl
                            shadow-[0_20px_70px_rgba(0,0,0,0.85)]
                            p-5 md:p-6
                            transition
                            hover:border-emerald-400/50
                            hover:shadow-[0_26px_90px_rgba(0,0,0,0.95)]
                            hover:-translate-y-0.5
                        "
                    >
                        <div className="flex items-baseline justify-between mb-4">
                            <div>
                                <div className="text-xs uppercase tracking-wide text-slate-400">
                                    {t("home.demo.badge")}
                                </div>
                                <div className="text-lg font-semibold">Brazil (BRA)</div>
                            </div>
                            <div className="text-xs text-slate-400">
                                {t("home.demo.example")}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Индикатор GDP */}
                            <div className="  
                                    rounded-2xl
                                    bg-slate-950/40
                                    border border-slate-800/80
                                    px-3 py-3
                                    shadow-[0_10px_30px_rgba(0,0,0,0.7)]
                                "
                            >
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="text-xs text-slate-400">
                                        {t("home.demo.gdp.label")}
                                    </div>
                                    <div className="text-xs text-emerald-400">
                                        {t("home.demo.gdp.trend")}
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
                            <div className="  
                                    rounded-2xl
                                    bg-slate-950/40
                                    border border-slate-800/80
                                    px-3 py-3
                                    shadow-[0_10px_30px_rgba(0,0,0,0.7)]
                                "
                            >
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="text-xs text-slate-400">
                                        {t("home.demo.pop.label")}
                                    </div>
                                    <div className="text-xs text-sky-400">
                                        {t("home.demo.pop.trend")}
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
                            {t("home.demo.footer")}
                        </div>
                    </div>
                </div>
                {/* Фичи */}
                <div className="mt-20">
                    <h2 className="text-2xl font-bold mb-8">{t("home.features.title")}</h2>

                    <div className="grid gap-6 grid-cols-3">
                        {/* Фича  1 */}
                        <div className="    
                                rounded-2xl
                                border border-emerald-400/10
                                bg-slate-900/40
                                backdrop-blur-xl
                                px-4 py-4
                                shadow-[0_16px_45px_rgba(0,0,0,0.8)]
                                transition
                                hover:border-emerald-400/40
                                hover:-translate-y-0.5
                            "
                        >
                            <div className="text-3xl mb-3">🗺️</div>
                            <h3 className="font-semibold mb-2">{t("home.features.map")}</h3>
                            <p className="text-slate-400 text-sm">
                                {t("home.features.map.desc")}
                            </p>
                        </div>

                        {/* Фича 2 */}
                        <div className="            
                                rounded-2xl
                                border border-emerald-400/10
                                bg-slate-900/40
                                backdrop-blur-xl
                                px-4 py-4
                                shadow-[0_16px_45px_rgba(0,0,0,0.8)]
                                transition
                                hover:border-emerald-400/40
                                hover:-translate-y-0.5
                            "
                        >
                            <div className="text-3xl mb-3">📈</div>
                            <h3 className="font-semibold mb-2">{t("home.features.trends")}</h3>
                            <p className="text-slate-400 text-sm">
                                {t("home.features.trends.desc")}
                            </p>
                        </div>

                        {/* Фича 3 */}
                        <div className="            
                                rounded-2xl
                                border border-emerald-400/10
                                bg-slate-900/40
                                backdrop-blur-xl
                                px-4 py-4
                                shadow-[0_16px_45px_rgba(0,0,0,0.8)]
                                transition
                                hover:border-emerald-400/40
                                hover:-translate-y-0.5
                            "
                        >
                            <div className="text-3xl mb-3">⚖️</div>
                            <h3 className="font-semibold mb-2">{t("home.features.compare")}</h3>
                            <p className="text-slate-400 text-sm">
                                {t("home.features.compare.desc")}
                            </p>
                        </div>
                    </div>
                </div>
                {/* Как это работает */}
                <div className="mt-20 border-t border-slate-800/70 pt-10">
                    <h2 className="text-2xl font-bold mb-6">{t("home.how.title")}</h2>
                    <p className="text-slate-400 text-sm max-w-2xl mb-8">
                        {t("home.how.intro")}
                    </p>

                    <div className="space-y-5">
                        {/* Шаг 1 */}
                        <div className="flex gap-4">
                            <div className="mt-1 h-7 w-7 rounded-full bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-xs font-semibold text-emerald-300">
                                1
                            </div>
                            <div>
                                <div className="font-semibold text-sm">{t("home.how.step1.title")}</div>
                                <div className="text-slate-400 text-sm">
                                    {t("home.how.step1.beforeMap")} <span className="font-medium text-slate-200">{t("home.how.step1.mapLabel")}</span>
                                    {t("home.how.step1.afterMap")}
                                </div>
                            </div>
                        </div>

                        {/* Шаг 2 */}
                        <div className="flex gap-4">
                            <div className="mt-1 h-7 w-7 rounded-full bg-sky-500/15 border border-sky-400/60 flex items-center justify-center text-xs font-semibold text-sky-300">
                                2
                            </div>
                            <div>
                                <div className="font-semibold text-sm">{t("home.how.step2.title")}</div>
                                <div className="text-slate-400 text-sm">
                                    {t("home.how.step2.text")}
                                </div>
                            </div>
                        </div>

                        {/* Шаг 3 */}
                        <div className="flex gap-4">
                            <div className="mt-1 h-7 w-7 rounded-full bg-purple-500/15 border border-purple-400/60 flex items-center justify-center text-xs font-semibold text-purple-300">
                                3
                            </div>
                            <div>
                                <div className="font-semibold text-sm">{t("home.how.step3.title")}</div>
                                <div className="text-slate-400 text-sm">
                                    {t("home.how.step3.text")}
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
