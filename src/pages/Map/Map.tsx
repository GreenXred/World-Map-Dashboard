import { useDispatch } from "react-redux";
import { useState } from "react";
import { setCountry } from "../../store/CountrySlice";
import { useNavigate } from "react-router-dom";
import { useWorldBankCountries } from "../../api/WorldBank";
import { WorldMapSvg } from "../../components/WorldMapSVG";
import { buildIsoMaps, type WorldBankCountriesResponse, type WorldBankCountry } from "../../utils/isoMaps";


// World Bank API возвращает массив из 2 элементов: data[0] - метаданные, data[1] - массив стран

export default function Map() {
    const dispatch = useDispatch();                             // чтобы отправлять экшены в Redux
    const navigate = useNavigate();                             // чтобы менять URL (роутер)
    const { data, isLoading, error } = useWorldBankCountries(); // запрос списка стран из World Bank

    const [hoveredCode, setHoveredCode] = useState<string | null>(null);   // код страны под курсором
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });              // позиция мыши над картой

    // Обновление состояния при наведении курсора на страну
    function handleCountryHover(code: string | null) {
        setHoveredCode(code);
    }

    // Обработчик движения мыши по SVG-карте
    function handleSvgMouseMove(event: React.MouseEvent<SVGSVGElement>) {
        const target = event.target as SVGElement;

        // Получение границ SVG-карты на экране
        const rect = event.currentTarget.getBoundingClientRect();

        // Сохранение позиции мыши относительно карты
        setMousePos({
            x: event.clientX - rect.left + 15, // +15 px, чтобы tooltip был чуть правее курсора
            y: event.clientY - rect.top + 15,
        });

        // Над какой страной сейчас курсор
        if (target.tagName === "path") {
            const iso2 = (target.id || "").toUpperCase(); // из атрибута id берём ISO2 ("RU")
            const iso3 = iso2ToIso3[iso2];                // по ISO2 находим ISO3 ("RUS")

            if (iso3) {
                handleCountryHover(iso3);                 // сохраняем код страны в стейте
                return;                                   // выходим, чтобы не сбрасывать hover
            }
        }

        // Если курсор не над страной — очистка hover
        handleCountryHover(null);
    }

    // Обработчик клика по SVG-карте
    function handleSvgClick(event: React.MouseEvent<SVGSVGElement>) {
        const target = event.target as SVGElement;

        if (target.tagName === "path") {
            const iso2 = (target.id || "").toUpperCase();
            const iso3 = iso2ToIso3[iso2];

            if (iso3) {
                goToCountryPage(iso3); // сразу открываем дашборд этой страны
            }
        }
    }

    // Вспомогательная функция: перейти на страницу страны
    function goToCountryPage(code: string) {
        dispatch(setCountry(code));        // кладём выбранную страну в Redux
        navigate(`/country/${code}`);      // идём на /country/{code}
    }

    let countries: WorldBankCountry[] = [];

    if (data) {
        const response = data as WorldBankCountriesResponse;
        const rawCountries = response[1];
        countries = [...rawCountries].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    // Тянем преобразование ISO2 -> ISO3 и карта ISO3 -> имя страны из isoMaps.ts
    const { iso2ToIso3, iso3ToName } = buildIsoMaps(
        (data as WorldBankCountriesResponse | undefined)
    );

    // Найти ISO2 по ISO3, чтобы показать флаг
    function findIso2ByIso3(iso3: string): string | null {
        for (const [iso2, code3] of Object.entries(iso2ToIso3)) {
            if (code3 === iso3) {
                return iso2; // нашли подходящий ISO2 (например "RU")
            }
        }
        return null; // если не нашли
    }

    const hoveredIso2 = hoveredCode ? findIso2ByIso3(hoveredCode) : null;

    return (
        <div className="flex flex-col items-center text-slate-100">
            <h1 className="text-3xl font-bold text-emerald-300">
                World Map
            </h1>

            {/* SVG-карта + tooltip */}
            <div className="mt-20 w-full max-w-10xl mx-auto relative">
                <WorldMapSvg
                    className="w-full h-auto world-map"
                    onMouseMove={handleSvgMouseMove}
                    onMouseLeave={() => handleCountryHover(null)}
                    onClick={handleSvgClick}
                />

                {/* Tooltip возле курсора */}
                {hoveredCode && (
                    <div
                        className="absolute z-50 bg-slate-900/90 text-slate-100 px-3 py-2 rounded-lg shadow-lg pointer-events-none text-sm flex items-center gap-2"
                        style={{
                            left: mousePos.x,
                            top: mousePos.y,
                        }}
                    >
                        {/* Флаг, если смогли найти ISO2 */}
                        {hoveredIso2 && (
                            <img
                                src={`https://flagcdn.com/40x30/${hoveredIso2.toLowerCase()}.png`}
                                alt={iso3ToName[hoveredCode] || hoveredCode}
                                className="rounded"
                            />
                        )}

                        <div className="flex flex-col">
                            <span className="font-semibold">
                                {iso3ToName[hoveredCode] || hoveredCode}
                            </span>
                            <span className="text-xs opacity-70">
                                ISO3: {hoveredCode}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* World Bank API возвращает массив из 2 элементов: data[0] - метаданные, data[1] - массив стран */}
            {isLoading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4">Error loading data.</p>}
            {data && (
                <p className="mt-20 text-sm text-slate-400">
                    Total countries and aggregates: {data[1].length}
                </p>
            )}

            {/* Список стран с возможностью клика */}
            {data && (
                <ul className="mt-4 space-y-2 mb-10">
                    {countries.map((country: any) => (
                        <li
                            key={country.id}
                            className="text-slate-200 cursor-pointer hover:text-emerald-400 transition"
                            onClick={() => {
                                goToCountryPage(country.id); // здесь сразу открываем страницу страны
                            }}
                        >
                            {country.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
