import { useDispatch } from "react-redux";
import { useState } from "react";
import { setCountry } from "../../store/CountrySlice";
import { useNavigate } from "react-router-dom";
import { useWorldBankCountries } from "../../api/WorldBank";

const COUNTRY_LABELS: Record<string, string> = {
    USA: "United States",
    BRA: "Brazil",
    RUS: "Russia",
    IND: "India",
    AUS: "Australia",
};

// World Bank API возвращает массив из 2 элементов: data[0] - метаданные, data[1] - массив стран

export default function Map() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, isLoading, error } = useWorldBankCountries();

    const [hoveredCode, setHoveredCode] = useState<string | null>(null); // код страны, над которой наведен курсор

    // Обработчик клика по стране на карте
    function handleCountryClick(code: string) {
        dispatch(setCountry(code)); // обновляем Redux, чтобы приложение знало, какая страна выбрана
        navigate(`/country/${code}`); // переключаем страницу на /country/{code}
    }

    // Обновление состояния при наведении курсора на страну
    function handleCountryHover(code: string | null) {
        setHoveredCode(code);
    }

    let countries: any[] = []; // TODO типизировать countries

    if (data) {
        countries = [...data[1]].sort((a: any, b: any) => // TODO типизировать a и b
            a.name.localeCompare(b.name)
        );
    }

    return (
        <div className="flex flex-col items-center text-slate-100">
            <h1 className="text-3xl font-bold text-emerald-300">
                Map
            </h1>

            {/* SVG-карта */}
            <div className="mt-6 w-full max-w-4xl mx-auto">

                {/* Подсвечивание названия наведенной страны */}
                <div className="mt-3 h-5 text-sm text-slate-200 text-center">
                    {hoveredCode ? COUNTRY_LABELS[hoveredCode] || hoveredCode : "\u00A0"}
                </div>

                <svg
                    viewBox="0 0 1000 500" // координатная система для карты
                    className="w-full h-auto"
                >
                    {/* USA */}
                    <path
                        d="M100,200 L250,200 L250,260 L100,260 Z"
                        className={`stroke-slate-900 stroke-[1.5] cursor-pointer transition 
                            ${hoveredCode === "USA" ? "fill-emerald-400" : "fill-slate-700"}`}
                        onMouseEnter={() => handleCountryHover("USA")}
                        onMouseLeave={() => handleCountryHover(null)}
                        onClick={() => handleCountryClick("USA")}
                    />

                    {/* Brazil */}
                    <path
                        d="M260,260 L340,260 L340,340 L260,340 Z"
                        className={`stroke-slate-900 stroke-[1.5] cursor-pointer transition 
                            ${hoveredCode === "BRA" ? "fill-emerald-400" : "fill-slate-700"}`}
                        onMouseEnter={() => handleCountryHover("BRA")}
                        onMouseLeave={() => handleCountryHover(null)}
                        onClick={() => handleCountryClick("BRA")}
                    />

                    {/* Russia */}
                    <path
                        d="M450,120 L700,120 L700,200 L450,200 Z"
                        className={`stroke-slate-900 stroke-[1.5] cursor-pointer transition 
                            ${hoveredCode === "RUS" ? "fill-emerald-400" : "fill-slate-700"}`}
                        onMouseEnter={() => handleCountryHover("RUS")}
                        onMouseLeave={() => handleCountryHover(null)}
                        onClick={() => handleCountryClick("RUS")}
                    />

                    {/* India */}
                    <path
                        d="M520,230 L580,230 L580,290 L520,290 Z"
                        className={`stroke-slate-900 stroke-[1.5] cursor-pointer transition 
                            ${hoveredCode === "IND" ? "fill-emerald-400" : "fill-slate-700"}`}
                        onMouseEnter={() => handleCountryHover("IND")}
                        onMouseLeave={() => handleCountryHover(null)}
                        onClick={() => handleCountryClick("IND")}
                    />

                    {/* Australia */}
                    <path
                        d="M700,320 L820,320 L820,400 L700,400 Z"
                        className={`stroke-slate-900 stroke-[1.5] cursor-pointer transition 
                            ${hoveredCode === "AUS" ? "fill-emerald-400" : "fill-slate-700"}`}
                        onMouseEnter={() => handleCountryHover("AUS")}
                        onMouseLeave={() => handleCountryHover(null)}
                        onClick={() => handleCountryClick("AUS")}
                    />
                </svg>
            </div>

            {/* World Bank API возвращает массив из 2 элементов: data[0] - метаданные, data[1] - массив стран */}
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading data.</p>}
            {data && <p>Total countries and aggregates: {data[1].length}</p>}

            {data && (
                <ul className="mt-4 space-y-2">
                    {countries.map((country: any) => ( //TODO типизировать country
                        <li key={country.id}
                            className="text-slate-200 cursor-pointer hover:text-emerald-400 transition"
                            onClick={() => {
                                dispatch(setCountry(country.id)); // обновляем Redux, чтобы приложение знало, какая страна выбрана
                                navigate(`/country/${country.id}`); // переключаем страницу на /country/{country.id}
                            }}
                        >
                            {country.name}
                        </li>
                    ))}
                </ul>
            )}

            <button
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg"
                onClick={() => {
                    dispatch(setCountry("US")); // обновляем Redux, чтобы приложение знало, какая страна выбрана
                    navigate("/country/US");    // переключаем страницу на /country/US
                }}
            >
                Выбрать страну: US
            </button>
        </div>
    );
}