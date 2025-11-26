export type IndicatorConfig = {
    id: string;                    // уникальный идентификатор индикатора, например "SP.POP.TOTL"
    label: string;                 // читаемое название индикатора, например "Население, всего"
    category: string;              // категория индикатора, например "Население"
    source: "worldBank" | "unSdg"; // источник данных индикатора World Bank или United Nations 
};

export const INDICATORS: IndicatorConfig[] = [
    {
        id: "NY.GDP.PCAP.CD",
        label: "GDP per capita (current US$)",
        category: "Economy",
        source: "worldBank",
    },
    {
        id: "SL.UEM.TOTL.ZS",
        label: "Unemployment rate (% of labor force)",
        category: "Economy",
        source: "worldBank",
    },
    {
        id: "SP.POP.TOTL",
        label: "Total Population",
        category: "Demography",
        source: "worldBank",
    },
    {
        id: "SP.URB.TOTL.IN.ZS",
        label: "Urban population (% of total population)",
        category: "Demography",
        source: "worldBank",
    },
    {
        id: "SP.DYN.LE00.IN",
        label: "Life expectancy at birth, total (years)",
        category: "The cocial sphere",
        source: "worldBank",
    },
    {
        id: "SE.PRM.NENR",
        label: "School enrollment, primary (% gross)",
        category: "The cocial sphere",
        source: "worldBank",
    },
    {
        id: "EN.ATM.CO2E.PC",
        label: "CO2 emissions (metric tons per capita)",
        category: "Ecology",
        source: "worldBank",
    },
    {
        id: "AG.LND.FRST.ZS",
        label: "Forest area (% of land area)",
        category: "Environment",
        source: "worldBank",
    },
];
