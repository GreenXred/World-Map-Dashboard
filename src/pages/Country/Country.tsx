import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setCountry } from "../../store/CountrySlice";
import type { RootState } from "../../store/Store";
import { useLanguage } from "../../i18next/LanguageContext";
import { INDICATORS } from "../../config/Indicators";
import IndicatorCard from "../../components/IndicatorCard";
import CountryChart from "../../components/CountryChart";

export default function Country() {
    const { code } = useParams();
    const selected = useSelector((state: RootState) => state.country.selectedCountry);
    const dispatch = useDispatch();
    const { t } = useLanguage();

    useEffect(() => {
        if (code) {
            dispatch(setCountry(code));
        }
    }, [code, dispatch]);

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl text-emerald-300 font-bold">
                {t("pageTitle")} {code}
            </h1>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
                {INDICATORS.map((indicator) => (
                    <IndicatorCard
                        key={indicator.id}
                        label={indicator.label}
                        indicatorId={indicator.id}
                        countryCode={code || ""}
                    />
                ))}
            </div>

            {/* Большой график */}
            {code && (
                <CountryChart countryCode={code} />
            )}

            <h1 className="text-3xl text-emerald-300">
                {t("selectedCountry")} {selected}
            </h1>
        </div>
    );
}
