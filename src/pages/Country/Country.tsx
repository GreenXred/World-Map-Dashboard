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
import { useTranslation } from "react-i18next";

import { setCountry } from "../../store/CountrySlice";
import { INDICATORS, type IndicatorConfig } from "../../config/Indicators";
import IndicatorCategory from "../../components/IndicatorCategory";
import CountryChart from "../../components/CountryChart";
import { useWorldBankCountries } from "../../api/WorldBank";

export default function Country() {
    const { code } = useParams();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { data: countriesData } = useWorldBankCountries();         // Данные стран
    const [compareCode, setCompareCode] = useState<string | undefined>(undefined); // Для сравнения стран

    useEffect(() => {
        if (code) {
            dispatch(setCountry(code));
        }
    }, [code, dispatch]);

    // Цветная полоска
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

    // Функция, которая по значению category возвращает ключи переводов для заголовка и описания
    function getCategoryTranslationKeys(category: IndicatorConfig["category"]): {
        titleKey: string;
        descriptionKey: string;
    } {
        switch (category) {
            case "Economy":
                return {
                    titleKey: "country.category.economy.title",
                    descriptionKey: "country.category.economy.description",
                };
            case "Demography":
                return {
                    titleKey: "country.category.demography.title",
                    descriptionKey: "country.category.demography.description",
                };
            case "Quality of Life":
                return {
                    titleKey: "country.category.qualityOfLife.title",
                    descriptionKey: "country.category.qualityOfLife.description",
                };
            case "Social Sphere":
                return {
                    titleKey: "country.category.socialSphere.title",
                    descriptionKey: "country.category.socialSphere.description",
                };
            case "Ecology":
                return {
                    titleKey: "country.category.ecology.title",
                    descriptionKey: "country.category.ecology.description",
                };
            case "Environment":
                return {
                    titleKey: "country.category.environment.title",
                    descriptionKey: "country.category.environment.description",
                };
            default:
                // Если вдруг появится новая категория
                return {
                    titleKey: "country.category.unknown.title",
                    descriptionKey: "country.category.unknown.description",
                };
        }
    }

    return (

        // Страница страны с заголовком, категориями индикаторов и большим графиком
        <div className="flex flex-col items-center p-6">
            {/* Хеддер */}
            <div
                className="
                    w-full max-w-5xl
                    mt-4 mb-10
                    rounded-3xl
                    border border-emerald-400/15
                    bg-slate-900/40
                    bg-gradient-to-r from-emerald-500/10 via-slate-900/40 to-slate-950/90
                    backdrop-blur-2xl
                    shadow-[0_24px_80px_rgba(0,0,0,0.85)]
                    px-6 py-5 md:px-8 py-6
                    flex items-center gap-6
                "
            >
                {/* Флаг в «рамке» */}
                {iso2 && (
                    <div className="shrink-0 rounded-2xl overflow-hidden border border-slate-700/70 shadow-lg shadow-black/60">
                        <img
                            src={`https://flagcdn.com/160x120/${iso2}.png`}
                            alt={countryInfo?.name}
                            className="block w-28 h-20 object-cover"
                        />
                    </div>
                )}

                {/* Текстовая часть */}
                <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-300/80 mb-1">
                        {t("country.header.title")}
                    </p>

                    <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
                        {countryInfo?.name || code}
                    </h1>

                    <div className="mt-3 grid gap-1 text-xs md:text-sm text-slate-300">
                        <p>
                            <span className="text-slate-400">{t("country.header.iso3")}:</span>{" "}
                            <span className="text-slate-100">{code}</span>
                        </p>

                        {countryInfo?.region && (
                            <p>
                                <span className="text-slate-400">{t("country.header.region")}:</span>{" "}
                                <span className="text-slate-100">
                                    {countryInfo.region.value}
                                </span>
                            </p>
                        )}

                        {countryInfo?.incomeLevel && (
                            <p>
                                <span className="text-slate-400">{t("country.header.income")}:</span>{" "}
                                <span className="text-slate-100">
                                    {countryInfo.incomeLevel.value}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Секции с категориями индикаторов */}
            <div className="w-full max-w-5xl space-y-8 mt-6">
                {categories.map((category) => {
                    const indicatorsInCategory = INDICATORS.filter(
                        (indicator) => indicator.category === category
                    );

                    const { titleKey, descriptionKey } =
                        getCategoryTranslationKeys(category);

                    return (
                        <IndicatorCategory
                            key={category}
                            title={t(titleKey)}
                            description={t(descriptionKey)}
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
