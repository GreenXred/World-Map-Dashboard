// Компонент:
// Получает код страны;
// Загружает данные о стране;
// Собирает категории индикаторов.

// Для каждой категории передаёт:
// название категории,
// описание,
// цвет,
// список индикаторов,
// код страны.

// Отрисовывает:
// заголовок страны,
// секции (IndicatorCategory),
// большой график (CountryChart).

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

import { setCountry } from "../../store/CountrySlice";
import { useLanguage } from "../../i18next/LanguageContext";
import { INDICATORS, type IndicatorConfig } from "../../config/Indicators";
import IndicatorCategory from "../../components/IndicatorCategory";
import CountryChart from "../../components/CountryChart";
import { useWorldBankCountries } from "../../api/WorldBank";

export default function Country() {
    const { code } = useParams();
    const dispatch = useDispatch();
    const { t } = useLanguage();
    const { data: countriesData } = useWorldBankCountries();         // Данные стран
    const [compareCode, setCompareCode] = useState<string | undefined>(undefined); // Для сравнения стран

    useEffect(() => {
        if (code) {
            dispatch(setCountry(code));
        }
    }, [code, dispatch]);

    // Описания категорий индикаторов
    const categoryDescriptions: Record<IndicatorConfig["category"], string> = {
        Economy: t("categoryEconomyDescription"),
        Demography: t("categoryDemographyDescription"),
        "Quality of Life": t("categoryQualityOfLifeDescription" as any),
        "Social Sphere": t("categorySocialSphereDescription" as any),
        Ecology: t("categoryEcologyDescription"),
        Environment: t("categoryEnvironmentDescription"),
    };

    const categoryAccent: Record<IndicatorConfig["category"], string> = {
        Economy: "bg-emerald-400",
        Demography: "bg-sky-400",
        "Quality of Life": "bg-rose-400",
        "Social Sphere": "bg-violet-400",
        Ecology: "bg-teal-300",
        Environment: "bg-lime-300",
    };

    // Тип одной страны из World Bank API
    type WorldBankCountry = {
        id: string;
        name: string;
        iso2Code: string;
        region?: { value: string } | null;
        incomeLevel?: { value: string } | null;
    };

    // Тип упрощённого объекта для селекта сравнения
    type CompareOption = {
        code: string;
        name: string;
    };

    // Достаём и сортируем список стран
    let countries: WorldBankCountry[] = [];

    // Проверка, что структура такая, как в World Bank API
    if (Array.isArray(countriesData) && Array.isArray(countriesData[1])) {
        const rawCountries = countriesData[1] as WorldBankCountry[];

        countries = [...rawCountries].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    // Получаем уникальные категории индикаторов
    const categories = Array.from(
        new Set(INDICATORS.map((indicator) => indicator.category))
    );

    // Находим данные страны по ISO3-коду
    let countryInfo: WorldBankCountry | undefined;

    if (Array.isArray(countriesData) && Array.isArray(countriesData[1])) {
        const rawCountries = countriesData[1] as WorldBankCountry[];

        countryInfo = rawCountries.find(
            (c) => c.id.toUpperCase() === code?.toUpperCase()
        );
    }

    // Получение ISO2 для флага
    function getIso2(c: WorldBankCountry | undefined): string | null {
        if (!c || !c.iso2Code) return null;
        return c.iso2Code.toLowerCase();
    }

    const iso2 = getIso2(countryInfo);

    // Список стран для селекта "Compare with" в графике
    const compareOptions: CompareOption[] = countries
        .filter((c) => c.id !== code) // убрать текущую страну
        .map((c) => ({
            code: c.id,  // ISO3-код страны
            name: c.name // название страны
        }));

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
                        <IndicatorCategory
                            key={category}
                            title={category}
                            description={categoryDescriptions[category]}
                            accentClass={categoryAccent[category]}
                            indicators={indicatorsInCategory}
                            countryCode={code ?? ""} 
                        />
                    );
                })}
            </div>

            {/* Большой график */}
            {code && (
                <CountryChart
                    countryCode={code}
                    compareCode={compareCode}
                    compareOptions={compareOptions}
                    onChangeCompare={setCompareCode}
                />
            )}
        </div>
    );
}
