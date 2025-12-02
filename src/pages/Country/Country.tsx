import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

import { setCountry } from "../../store/CountrySlice";
import { useLanguage } from "../../i18next/LanguageContext";
import { INDICATORS } from "../../config/Indicators";
import IndicatorCard from "../../components/IndicatorCard";
import CountryChart from "../../components/CountryChart";
import { useWorldBankCountries } from "../../api/WorldBank";


export default function Country() {
    const { code } = useParams();
    const dispatch = useDispatch();
    const { t } = useLanguage();
    const { data: countriesData } = useWorldBankCountries();
    const [compareCode, setCompareCode] = useState<string | "">(""); // Для сравнения стран

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

    // Находим данные страны по ISO3-коду
    let countryInfo = null;

    if (countriesData && countriesData[1]) {
        countryInfo = countriesData[1].find(
            (c: any) => c.id.toUpperCase() === code?.toUpperCase() // TODO типизировать any
        );
    }

    // Получение ISO2 для флага
    function getIso2(c: any): string | null { // TODO типизировать any
        if (!c || !c.iso2Code) return null;
        return c.iso2Code.toLowerCase();
    }

    const iso2 = countryInfo ? getIso2(countryInfo) : null;

    return (

        // Страница страны с заголовком, категориями индикаторов и большим графиком
        <div className="flex flex-col items-center p-6">
            {/* Хеддер */}
            <div className="flex items-center gap-4 mt-2 mb-6 bg-slate-800/40 px-6 py-4 rounded-xl shadow-lg border border-slate-700/50">
                {/* Флаг страны */}
                {iso2 && (
                    <img
                        src={`https://flagcdn.com/80x60/${iso2}.png`}
                        alt={countryInfo?.name}
                        className="rounded shadow"
                    />
                )}
                {/* Хеддер */}
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold text-emerald-300">
                        {countryInfo?.name || code}
                    </h1>

                    <p className="text-sm text-slate-400">
                        ISO3: <span className="text-slate-200">{code}</span>
                    </p>

                    {countryInfo?.region && (
                        <p className="text-sm text-slate-400">
                            Region: <span className="text-slate-200">{countryInfo.region.value}</span>
                        </p>
                    )}

                    {countryInfo?.incomeLevel && (
                        <p className="text-sm text-slate-400">
                            Income level: <span className="text-slate-200">{countryInfo.incomeLevel.value}</span>
                        </p>
                    )}
                </div>
            </div>

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
