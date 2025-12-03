// Получение значения конкретного индикатора для одной страны из World Bank API

import { useQuery } from "@tanstack/react-query";
import type { WorldBankIndicatorResponse } from "../utils/Formatting";

export function useWorldBankIndicator(countryCode: string, indicatorId: string) {
    return useQuery<WorldBankIndicatorResponse>({
        queryKey: ["indicator", countryCode, indicatorId],
        queryFn: async () => {
            const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicatorId}?format=json&per_page=100`;

            const response = await fetch(url);
            const data = await response.json();

            return data as WorldBankIndicatorResponse;
        },
    });
}
