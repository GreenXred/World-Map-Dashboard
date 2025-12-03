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
        category: "Quality of life",
        source: "worldBank",
    },
    {
        id: "SP.DYN.TFRT.IN",
        label: "Total fertility rate (births per woman)",
        category: "Quality of Life",
        source: "worldBank",
    },
    {
        id: "SE.PRM.NENR",
        label: "School enrollment, primary (% gross)",
        category: "Social Sphere",
        source: "worldBank",
    },
    {
        id: "SE.TER.ENRR",
        label: "Tertiary school enrollment (% gross)",
        category: "Social Sphere",
        source: "worldBank",
    },
    {
        id: "EN.ATM.GHGT.KT.CE",
        label: "Greenhouse gas emissions (kt CO₂ eq.)",
        category: "Ecology",
        source: "worldBank",
    },
    {
        id: "EN.ATM.PM25.MC.M3",
        label: "PM2.5 air pollution (µg/m³)",
        category: "Ecology",
        source: "worldBank",
    },
    {
        id: "AG.LND.FRST.ZS",
        label: "Forest area (% of land area)",
        category: "Environment",
        source: "worldBank",
    },
    {
        id: "EG.FEC.RNEW.ZS",
        label: "Renewable energy consumption (% of total)",
        category: "Environment",
        source: "worldBank",
    },
];
