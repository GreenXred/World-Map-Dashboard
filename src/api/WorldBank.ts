import { useQuery } from "@tanstack/react-query";

export function useWorldBankCountries() {
    return useQuery({
        queryKey: ["worldBankCountries"],
        queryFn: async () => {
            const response = await fetch(
                "https://api.worldbank.org/v2/country?format=json"
            );
            const data = await response.json();
            return data;
        },
    });
}