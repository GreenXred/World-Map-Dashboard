import { describe, it, expect } from "vitest";
import {
    buildIsoMaps,
    type WorldBankCountriesResponse,
    type WorldBankCountry,
} from "../utils/isoMaps";

describe("buildIsoMaps", () => {
    it("строит корректные словари iso2ToIso3 и iso3ToName", () => {
        const countries: WorldBankCountry[] = [
            { id: "RUS", iso2Code: "ru", name: "Russian Federation" },
            { id: "BRA", iso2Code: "BR", name: "Brazil" },
        ];

        const response: WorldBankCountriesResponse = [{}, countries];

        const { iso2ToIso3, iso3ToName } = buildIsoMaps(response);

        expect(iso2ToIso3).toEqual({
            RU: "RUS",
            BR: "BRA",
        });

        expect(iso3ToName).toEqual({
            RUS: "Russian Federation",
            BRA: "Brazil",
        });
    });

    it("возвращает пустые словари, если ответа нет", () => {
        const { iso2ToIso3, iso3ToName } = buildIsoMaps(undefined);

        expect(iso2ToIso3).toEqual({});
        expect(iso3ToName).toEqual({});
    });
});
