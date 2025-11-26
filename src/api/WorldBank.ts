import { useQuery } from "@tanstack/react-query";

export function useWorldBankCountries() {
    return useQuery({
        queryKey: ["worldBankCountries"],
        queryFn: async () => {
            const response = await fetch(
                "https://api.worldbank.org/v2/country?format=json&per_page=300"
            );
            const data = await response.json();
            return data;
        },
    });
}

// [
//   {
//     "page": 1,
//     "pages": 6,
//     "per_page": "50",
//     "total": 264
//   },
//   [
//     { "id": "AFG", "name": "Afghanistan", ... },
//     { "id": "ALB", "name": "Albania", ... },
//     {...}
//   ]
// ]