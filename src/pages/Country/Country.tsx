import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setCountry } from "../../store/CountrySlice";
import { useLanguage } from "../../i18next/LanguageContext";
import { INDICATORS } from "../../config/Indicators";
import IndicatorCard from "../../components/IndicatorCard";
import CountryChart from "../../components/CountryChart";

export default function Country() {
    const { code } = useParams();
    const dispatch = useDispatch();
    const { t } = useLanguage();

    useEffect(() => {
        if (code) {
            dispatch(setCountry(code));
        }
    }, [code, dispatch]);

    // Описания категорий индикаторов
    const categoryDescriptions: Record<string, string> = {
        Economy: t("categoryEconomyDescription"),
        Demography: t("categoryDemographyDescription"),
        Social: t("categorySocialDescription"),
        Ecology: t("categoryEcologyDescription"),
        Environment: t("categoryEnvironmentDescription"),
    };

    // Получаем уникальные категории индикаторов
    const categories = Array.from(
        new Set(INDICATORS.map((indicator) => indicator.category))
    );

    return (

        // Страница страны с заголовком, категориями индикаторов и большим графиком
        <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl text-emerald-300 font-bold">
                {t("pageTitle")} {code}
            </h1>

            <div className="w-full max-w-5xl space-y-8 mt-6">
                {categories.map((category) => {
                    const indicatorsInCategory = INDICATORS.filter(
                        (indicator) => indicator.category === category
                    );

                    return (
                        <section key={category}>
                            <h2 className="text-lg font-semibold text-slate-200 mb-3">
                                {category}
                            </h2>

                            <p className="text-sm text-slate-400 mb-3">
                                {categoryDescriptions[category]}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {indicatorsInCategory.map((indicator) => (
                                    <IndicatorCard
                                        key={indicator.id}
                                        label={indicator.label}
                                        indicatorId={indicator.id}
                                        countryCode={code || ""}
                                    />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* Большой график */}
            {code && (
                <CountryChart countryCode={code} />
            )}

        </div>
    );
}
