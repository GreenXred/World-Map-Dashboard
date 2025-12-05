export type IndicatorConfig = {
    id: string;                    // уникальный идентификатор индикатора, например "SP.POP.TOTL"
    label: string;                 // читаемое название индикатора, например "Население, всего"
    category: "Economy" | "Demography" | "Quality of Life" | "Social Sphere" | "Ecology" | "Environment"; // категория индикатора
    source: "worldBank" | "unSdg"; // источник данных индикатора World Bank или United Nations 
};

export const INDICATORS: IndicatorConfig[] = [
    {
        id: "NY.GDP.PCAP.CD",
        label: "indicators.gdpPerCapita",
        category: "Economy",
        source: "worldBank",
    },
    {
        id: "SL.UEM.TOTL.ZS",
        label: "indicators.unemploymentRate",
        category: "Economy",
        source: "worldBank",
    },
    {
        id: "SP.POP.TOTL",
        label: "indicators.totalPopulation",
        category: "Demography",
        source: "worldBank",
    },
    {
        id: "SP.URB.TOTL.IN.ZS",
        label: "indicators.urbanPopulationShare",
        category: "Demography",
        source: "worldBank",
    },
    {
        id: "SP.DYN.LE00.IN",
        label: "indicators.lifeExpectancy",
        category: "Quality of Life",
        source: "worldBank",
    },
    {
        id: "SP.DYN.TFRT.IN",
        label: "indicators.fertilityRate",
        category: "Quality of Life",
        source: "worldBank",
    },
    {
        id: "SE.PRM.NENR",
        label: "indicators.primaryEnrollment",
        category: "Social Sphere",
        source: "worldBank",
    },
    {
        id: "SE.TER.ENRR",
        label: "indicators.tertiaryEnrollment",
        category: "Social Sphere",
        source: "worldBank",
    },
    {
        id: "EG.USE.PCAP.KG.OE", // https://api.worldbank.org/v2/country/YEM/indicator/EG.USE.PCAP.KG.OE?format=json
        label: "indicators.energyUse",
        category: "Ecology",
        source: "worldBank",
    },
    {
        id: "EN.ATM.PM25.MC.M3",
        label: "indicators.pm25",
        category: "Ecology",
        source: "worldBank",
    },
    {
        id: "AG.LND.FRST.ZS",
        label: "indicators.forestArea",
        category: "Environment",
        source: "worldBank",
    },
    {
        id: "EG.FEC.RNEW.ZS",
        label: "indicators.renewableEnergy",
        category: "Environment",
        source: "worldBank",
    },
];
