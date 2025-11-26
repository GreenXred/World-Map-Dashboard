import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/Store";
import { useDispatch } from "react-redux";
import { setCountry } from "../../store/CountrySlice";
import { useEffect } from "react";

import { INDICATORS } from "../../config/indicators";
import IndicatorCard from "../../components/IndicatorCard";



export default function Country() {
    const { code } = useParams();
    const selected = useSelector((state: RootState) => state.country.selectedCountry);
    const dispatch = useDispatch();

    useEffect(() => {
        if (code) {
            dispatch(setCountry(code));
        }
    }, [code, dispatch]);


    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl text-emerald-300 font-bold">
                Страна: {code}
            </h1>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
                {INDICATORS.map((indicator) => (
                    <IndicatorCard
                        key={indicator.id}
                        label={indicator.label}
                        value={null}      // заглушка
                        year={null}       // заглушка
                    />
                ))}
            </div>

            <h1 className="text-3xl text-emerald-300">
                Выбранная страна: {selected}
            </h1>
        </div>
    );
}
