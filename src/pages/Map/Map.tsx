import { useDispatch } from "react-redux";
import { setCountry } from "../../store/CountrySlice";
import { useNavigate } from "react-router-dom";
import { useWorldBankCountries } from "../../api/WorldBank";

// World Bank API возвращает массив из 2 элементов: data[0] - метаданные, data[1] - массив стран

export default function Map() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, isLoading, error } = useWorldBankCountries();

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

            {/* World Bank API возвращает массив из 2 элементов: data[0] - метаданные, data[1] - массив стран */}
            {isLoading && <p>Loading...</p>}
            {error && <p>Error</p>}
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