// Компонент отвечает только за верстку + рендер IndicatorCard по массиву в Country.tsx
// Рисует заголовок категории,
// Рисует тонкую цветную полоску,
// Рисует описание,
// Создаёт сетку из IndicatorCard,

import IndicatorCard from "./IndicatorCard";
import type { IndicatorConfig } from "../config/Indicators";

type IndicatorCategoryProps = {
    title: string;
    description?: string;        // описание категории
    accentClass: string;
    indicators: IndicatorConfig[];
    countryCode: string;
};

export default function IndicatorCategory({
    title,
    description,
    accentClass,
    indicators,
    countryCode,
}: IndicatorCategoryProps) {
    return (
        <section className="w-full max-w-5xl mx-auto mb-8">
            {/* Заголовок категории */}
            <div className="mb-4 flex items-start gap-3">
                <div className={`mt-1 w-1 h-5 rounded-full ${accentClass}`} />

                <div>
                    <h2 className="text-sm md:text-base font-semibold text-slate-50">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-xs md:text-sm text-slate-400 mt-1">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Сетка карточек индикаторов */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {indicators.map((ind) => (
                    <IndicatorCard
                        key={ind.id}
                        label={ind.label}
                        indicatorId={ind.id}
                        countryCode={countryCode}
                    />
                ))}
            </div>
        </section>
    );
}
