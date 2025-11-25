import { useDispatch } from "react-redux";
import { setCountry } from "../../store/CountrySlice";

export default function Map() {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold text-emerald-300">
                Map
            </h1>
            <button
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg"
                onClick={() => dispatch(setCountry("US"))}
            >
                Выбрать страну: US
            </button>
        </div>
    );
}