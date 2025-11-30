import { useDispatch } from "react-redux";
import { useState } from "react";
import { setCountry } from "../../store/CountrySlice";
import { useNavigate } from "react-router-dom";
import { useWorldBankCountries } from "../../api/WorldBank";
import { WorldMapSvg } from "../../components/WorldMapSVG";

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

    // Обработчики событий мыши для SVG-карты
    function handleSvgMouseMove(event: React.MouseEvent<SVGSVGElement>) {
        const target = event.target as SVGElement;

        if (target.tagName === "path") {
            const iso2 = (target.id || "").toUpperCase();
            const iso3 = iso2ToIso3[iso2];

            if (iso3) {
                handleCountryHover(iso3);
                return;
            }
        }

        handleCountryHover(null);
    }

    // Обработчик клика по SVG-карте
    function handleSvgClick(event: React.MouseEvent<SVGSVGElement>) {
        const target = event.target as SVGElement;

        if (target.tagName === "path") {
            const iso2 = (target.id || "").toUpperCase();
            const iso3 = iso2ToIso3[iso2];

            if (iso3) {
                handleCountryClick(iso3);
            }
        }
    }

    let countries: any[] = []; // TODO типизировать countries

    if (data) {
        countries = [...data[1]].sort((a: any, b: any) => // TODO типизировать a и b
            a.name.localeCompare(b.name)
        );
    }

    // Преобразование ISO2 в ISO3 для сопоставления с картой
    const iso2ToIso3: Record<string, string> = {};

    if (data) {
        data[1].forEach((c: any) => {
            if (c.iso2Code && c.id) {
                iso2ToIso3[c.iso2Code.toUpperCase()] = c.id.toUpperCase();
            }
        });
    }

    return (
        <div className="flex flex-col items-center text-slate-100">
            <h1 className="text-3xl font-bold text-emerald-300">
                Map
            </h1>

            {/* SVG-карта */}
            <div className="mt-6 w-full max-w-4xl mx-auto">
                <WorldMapSvg
                    className="w-full h-auto world-map"
                    onMouseMove={handleSvgMouseMove}
                    onMouseLeave={() => handleCountryHover(null)}
                    onClick={handleSvgClick}
                />
            </div>

            {/* Подпись под картой — текущая наведённая страна */}
            <div className="mt-3 h-5 text-sm text-slate-200 text-center">
                {hoveredCode ? hoveredCode : "\u00A0"}
            </div>

            {/* World Bank API возвращает массив из 2 элементов: data[0] - метаданные, data[1] - массив стран */}
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading data.</p>}
            {data && <p>Total countries and aggregates: {data[1].length}</p>}

            {/* Список стран с возможностью клика */}
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