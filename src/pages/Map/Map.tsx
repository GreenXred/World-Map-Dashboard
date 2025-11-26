import { useDispatch } from "react-redux";
import { setCountry } from "../../store/CountrySlice";
import { useNavigate } from "react-router-dom";
import { useWorldBankCountries } from "../../api/WorldBank";

const { data, isLoading, error } = useWorldBankCountries();

{isLoading && <p>Загрузка...</p>}
{error && <p>Произошла ошибка</p>}
{data && <p>Всего стран: {data[1].length}</p>}

export default function Map() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold text-emerald-300">
                Map
            </h1>
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