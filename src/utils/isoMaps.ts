// Логика, которая по данным World Bank строит:

//"RU" -> "RUS"
//"RUS" -> "Russian Federation"

// Тип одной страны из World Bank API
export type WorldBankCountry = {
    id: string;       // ISO3, например RUS
    iso2Code: string; // ISO2, например RU
    name: string;     // Russian Federation
};

// Тип полного ответа World Bank по странам, упрощённо
export type WorldBankCountriesResponse = [unknown, WorldBankCountry[]];

export type IsoMaps = {
    iso2ToIso3: Record<string, string>;
    iso3ToName: Record<string, string>;
};

// Словарь RU -> RUS, RUS -> Russian Federation
export function buildIsoMaps(
    response: WorldBankCountriesResponse | undefined
): IsoMaps {
    const iso2ToIso3: Record<string, string> = {};
    const iso3ToName: Record<string, string> = {};

    if (!response || !Array.isArray(response[1])) {
        return { iso2ToIso3, iso3ToName };
    }

    const countries = response[1];

    for (const country of countries) {
        if (!country.iso2Code || !country.id) {
            continue;
        }

        const iso2 = country.iso2Code.toUpperCase();
        const iso3 = country.id.toUpperCase();

        iso2ToIso3[iso2] = iso3;
        iso3ToName[iso3] = country.name;
    }

    return { iso2ToIso3, iso3ToName };
}
