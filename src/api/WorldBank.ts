// Получение списка стран из World Bank API

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

// [
//   { date: "2024", value: null },
//   { date: "2023", value: 12345 },
//   ...
// ]

// [
//     {
//         "page": 1,
//         "pages": 1,
//         "per_page": "50",
//         "total": 1
//     },
//     [
//         {
//             "id": "BRA",
//             "iso2Code": "BR",
//             "name": "Brazil",
//             "region": {
//                 "id": "LCN",
//                 "iso2code": "ZJ",
//                 "value": "Latin America & Caribbean (all income levels)"
//             },
//             "adminregion": {
//                 "id": "LAC",
//                 "iso2code": "XJ",
//                 "value": "Latin America & Caribbean (developing only)"
//             },
//             "incomeLevel": {
//                 "id": "UMC",
//                 "iso2code": "XT",
//                 "value": "Upper middle income"
//             },
//             "lendingType": {
//                 "id": "IBD",
//                 "iso2code": "XF",
//                 "value": "IBRD"
//             },
//             "capitalCity": "Brasilia",
//             "longitude": "-47.9292",
//             "latitude": "-15.7801"
//         }
//     ]
// ]