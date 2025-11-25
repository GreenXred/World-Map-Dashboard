import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/Store";
import { useDispatch } from "react-redux";
import { setCountry } from "../../store/CountrySlice";
import { useEffect } from "react";


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
        <div className="flex items-center justify-center">
            <h1 className="text-3xl text-emerald-300 font-bold">
                Страна: {code}
            </h1>
            <h1 className="text-3xl text-emerald-300">
                Выбранная страна: {selected}
            </h1>
        </div>
    );
}
