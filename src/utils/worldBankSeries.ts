// Нормализация ответа World Bank в массиве { year, value } по возрастанию года

export function normalizeWorldBankSeries(rawData: any): { year: number; value: number }[] { // TODO типизировать
    // Если данных нет или формат другой — возвращаем пустой массив, чтобы не ломать рендер
    if (!rawData || !Array.isArray(rawData[1])) {
        return [];
    }

    return rawData[1]
        .filter((item) => item && item.value !== null) // убираем записи без значения
        .map((item) => ({
            year: Number(item.date),   // "2024" -> 2024
            value: Number(item.value), // приводим к числу
        }))
        .sort((a, b) => a.year - b.year); // упорядочиваем по годам: от старых к новым
}
