import { describe, it, expect } from "vitest";
import {
  normalizeWorldBank,
  type WorldBankIndicatorResponse,
  formatIndicatorValue,
} from "../utils/Formatting";

describe("normalizeWorldBank", () => {
  it("фильтрует null-значения и сортирует данные по возрастанию года", () => {
    const response: WorldBankIndicatorResponse = [
      {},
      [
        { date: "2020", value: 100 },
        { date: "2018", value: null }, // должно отфильтроваться
        { date: "2019", value: 50 },
      ],
    ];

    const result = normalizeWorldBank(response);

    expect(result.length).toBe(2);
    expect(result[0]).toEqual({ year: 2019, value: 50 });
    expect(result[1]).toEqual({ year: 2020, value: 100 });
  });

  it("форматирует ВВП на душу населения как валюту с долларом", () => {
    const formatted = formatIndicatorValue("NY.GDP.PCAP.CD", 12345.678);

    expect(formatted.startsWith("$")).toBe(true);
    expect(formatted).not.toBe("$12345.678");
  });

  it("форматирует уровень безработицы как процент с одной цифрой", () => {
    const formatted = formatIndicatorValue("SL.UEM.TOTL.ZS", 7.234);

    expect(formatted.endsWith("%")).toBe(true);
    expect(formatted).toBe("7.2%");
  });
});
