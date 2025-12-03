// Компонент отвечает только за верстку + рендер IndicatorCard по массиву в Country.tsx

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
            <div className="flex items-center mb-1">
                <div className={`w-2 h-6 rounded-full mr-3 ${accentClass}`} />
                <h2 className="text-lg font-semibold text-slate-100">
                    {title}
                </h2>
            </div>

            {description && (
                <p className="text-sm text-slate-400 mb-3">
                    {description}
                </p>
            )}

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
