export interface SWFund {
  name: string;
  country: string;
  countryCode: string;
  aum: number; // billions USD
  founded: number;
  source: string; // Oil, Non-commodity, etc.
  region: string;
  lat: number;
  lng: number;
  notableInvestments: string[];
  defenseExposure: 'High' | 'Medium' | 'Low' | 'None';
  techExposure: 'High' | 'Medium' | 'Low' | 'None';
  transparency: 'High' | 'Medium' | 'Low';
  description: string;
}

export const swfData: SWFund[] = [
  {
    name: "Norway Government Pension Fund Global",
    country: "Norway",
    countryCode: "NO",
    aum: 1700,
    founded: 1990,
    source: "Oil & Gas",
    region: "Europe",
    lat: 59.91,
    lng: 10.75,
    notableInvestments: ["Apple", "Microsoft", "Nestlé", "Shell", "Samsung"],
    defenseExposure: "Low",
    techExposure: "High",
    transparency: "High",
    description: "World's largest SWF. Strict ethical guidelines exclude weapons manufacturers, coal companies, and human rights violators. Holds 1.5% of all global listed equities."
  },
  {
    name: "China Investment Corporation (CIC)",
    country: "China",
    countryCode: "CN",
    aum: 1350,
    founded: 2007,
    source: "Non-commodity",
    region: "Asia-Pacific",
    lat: 39.91,
    lng: 116.40,
    notableInvestments: ["Blackstone", "Morgan Stanley", "Thames Water", "Heathrow Airport", "Alibaba"],
    defenseExposure: "Medium",
    techExposure: "High",
    transparency: "Low",
    description: "China's primary SWF. Strategic investments in Western infrastructure and technology. Subject to increasing CFIUS scrutiny in US acquisitions."
  },
  {
    name: "Abu Dhabi Investment Authority (ADIA)",
    country: "UAE",
    countryCode: "AE",
    aum: 993,
    founded: 1976,
    source: "Oil & Gas",
    region: "Middle East",
    lat: 24.45,
    lng: 54.65,
    notableInvestments: ["Citigroup", "Gatwick Airport", "Cepsa", "Apollo Global", "Brookfield"],
    defenseExposure: "Medium",
    techExposure: "Medium",
    transparency: "Low",
    description: "One of the oldest and largest SWFs. Diversified portfolio across 24+ asset classes in 80+ markets. Conservative, long-term investment horizon."
  },
  {
    name: "Kuwait Investment Authority (KIA)",
    country: "Kuwait",
    countryCode: "KW",
    aum: 923,
    founded: 1953,
    source: "Oil & Gas",
    region: "Middle East",
    lat: 29.38,
    lng: 47.99,
    notableInvestments: ["Daimler", "BP", "Bank of America", "Industrial Bank of Korea"],
    defenseExposure: "Low",
    techExposure: "Medium",
    transparency: "Medium",
    description: "World's oldest SWF. Manages both Future Generations Fund and General Reserve Fund. Key stabilizer during Gulf War reconstruction."
  },
  {
    name: "GIC Private Limited",
    country: "Singapore",
    countryCode: "SG",
    aum: 770,
    founded: 1981,
    source: "Non-commodity",
    region: "Asia-Pacific",
    lat: 1.29,
    lng: 103.85,
    notableInvestments: ["UBS", "Citigroup", "Global Logistic Properties", "Equinix"],
    defenseExposure: "Low",
    techExposure: "High",
    transparency: "Medium",
    description: "Manages Singapore's foreign reserves. Known for contrarian investments during financial crises. Strong real estate and infrastructure portfolio."
  },
  {
    name: "Public Investment Fund (PIF)",
    country: "Saudi Arabia",
    countryCode: "SA",
    aum: 925,
    founded: 1971,
    source: "Oil & Gas",
    region: "Middle East",
    lat: 24.71,
    lng: 46.68,
    notableInvestments: ["Lucid Motors", "Nintendo", "Uber", "NEOM", "Saudi Aramco", "LIV Golf"],
    defenseExposure: "Medium",
    techExposure: "High",
    transparency: "Medium",
    description: "Backbone of Saudi Vision 2030. Aggressive expansion into tech, gaming, sports, and megaprojects. Invested $3.5B in Lucid Motors, significant stakes in global gaming."
  },
  {
    name: "SAFE Investment Company",
    country: "China",
    countryCode: "CN",
    aum: 1090,
    founded: 1997,
    source: "Non-commodity",
    region: "Asia-Pacific",
    lat: 39.93,
    lng: 116.39,
    notableInvestments: ["Total Energies", "BP", "Shell", "UK real estate"],
    defenseExposure: "Low",
    techExposure: "Medium",
    transparency: "Low",
    description: "Manages part of China's $3.2T foreign exchange reserves. Extremely opaque — considered a 'shadow SWF'. Significant European energy and property holdings."
  },
  {
    name: "Hong Kong Monetary Authority Investment Portfolio",
    country: "Hong Kong",
    countryCode: "HK",
    aum: 587,
    founded: 1993,
    source: "Non-commodity",
    region: "Asia-Pacific",
    lat: 22.32,
    lng: 114.17,
    notableInvestments: ["US Treasuries", "Global equities", "Asian infrastructure"],
    defenseExposure: "None",
    techExposure: "Medium",
    transparency: "High",
    description: "Manages Hong Kong's Exchange Fund. Conservative portfolio heavily weighted toward US Treasuries and global fixed income. Currency peg defense reserve."
  },
  {
    name: "Temasek Holdings",
    country: "Singapore",
    countryCode: "SG",
    aum: 382,
    founded: 1974,
    source: "Non-commodity",
    region: "Asia-Pacific",
    lat: 1.28,
    lng: 103.84,
    notableInvestments: ["DBS Bank", "Singtel", "Sea Limited", "BioNTech", "FTX (written off)"],
    defenseExposure: "Medium",
    techExposure: "High",
    transparency: "High",
    description: "Active investor in technology, fintech, and biotech. Took $275M loss on FTX collapse. Strong focus on Asia-Pacific growth companies and early-stage tech."
  },
  {
    name: "Qatar Investment Authority (QIA)",
    country: "Qatar",
    countryCode: "QA",
    aum: 526,
    founded: 2005,
    source: "Oil & Gas",
    region: "Middle East",
    lat: 25.29,
    lng: 51.53,
    notableInvestments: ["Volkswagen", "Barclays", "Harrods", "Credit Suisse", "Rosneft"],
    defenseExposure: "Medium",
    techExposure: "Medium",
    transparency: "Low",
    description: "Aggressive acquirer of trophy assets: London's Shard, Paris Saint-Germain, Harrods. 17% stake in Volkswagen. Controversial Rosneft investment maintained through sanctions."
  },
  {
    name: "National Social Security Fund (NSSF)",
    country: "China",
    countryCode: "CN",
    aum: 474,
    founded: 2000,
    source: "Non-commodity",
    region: "Asia-Pacific",
    lat: 39.90,
    lng: 116.41,
    notableInvestments: ["Chinese A-shares", "Hong Kong equities", "Global bonds"],
    defenseExposure: "Low",
    techExposure: "Medium",
    transparency: "Low",
    description: "China's pension reserve fund. Primarily domestic Chinese equities and bonds. Growing international diversification."
  },
  {
    name: "Australia Future Fund",
    country: "Australia",
    countryCode: "AU",
    aum: 211,
    founded: 2006,
    source: "Non-commodity",
    region: "Asia-Pacific",
    lat: -35.28,
    lng: 149.13,
    notableInvestments: ["Global equities", "Private equity", "Infrastructure"],
    defenseExposure: "Low",
    techExposure: "Medium",
    transparency: "High",
    description: "Established to fund public sector pension liabilities. Well-diversified global portfolio. Strict ESG framework and governance standards."
  },
  {
    name: "Mubadala Investment Company",
    country: "UAE",
    countryCode: "AE",
    aum: 302,
    founded: 2002,
    source: "Oil & Gas",
    region: "Middle East",
    lat: 24.47,
    lng: 54.37,
    notableInvestments: ["GlobalFoundries", "AMD", "Cologix", "CEPSA", "Cleveland Clinic Abu Dhabi"],
    defenseExposure: "High",
    techExposure: "High",
    transparency: "Medium",
    description: "Abu Dhabi's strategic development fund. Major semiconductor play through GlobalFoundries. Defense partnerships via EDGE Group. AI investments through G42."
  },
  {
    name: "Korea Investment Corporation (KIC)",
    country: "South Korea",
    countryCode: "KR",
    aum: 200,
    founded: 2005,
    source: "Non-commodity",
    region: "Asia-Pacific",
    lat: 37.57,
    lng: 126.98,
    notableInvestments: ["Global equities", "US Treasuries", "Alternative assets"],
    defenseExposure: "Low",
    techExposure: "Medium",
    transparency: "High",
    description: "Manages a portion of South Korea's foreign reserves. Conservative mandate with increasing allocation to alternatives and infrastructure."
  },
  {
    name: "Investment Corporation of Dubai (ICD)",
    country: "UAE",
    countryCode: "AE",
    aum: 320,
    founded: 2006,
    source: "Oil & Gas",
    region: "Middle East",
    lat: 25.20,
    lng: 55.27,
    notableInvestments: ["Emirates NBD", "Emirates Airlines", "Dubai Airports", "DEWA"],
    defenseExposure: "Low",
    techExposure: "Medium",
    transparency: "Medium",
    description: "Dubai's principal investment arm. Manages stakes in major Dubai government-related entities. Portfolio concentrated in financial services and transportation."
  },
  {
    name: "Abu Dhabi Developmental Holding (ADQ)",
    country: "UAE",
    countryCode: "AE",
    aum: 198,
    founded: 2018,
    source: "Oil & Gas",
    region: "Middle East",
    lat: 24.44,
    lng: 54.44,
    notableInvestments: ["Etihad Airways", "Abu Dhabi Ports", "ADNOC Distribution", "Louis Dreyfus"],
    defenseExposure: "Low",
    techExposure: "Medium",
    transparency: "Medium",
    description: "Abu Dhabi's newest SWF focused on food security, healthcare, and logistics. Key vehicle for Abu Dhabi's economic diversification strategy."
  },
  {
    name: "National Wealth Fund (Russia)",
    country: "Russia",
    countryCode: "RU",
    aum: 150,
    founded: 2008,
    source: "Oil & Gas",
    region: "Europe",
    lat: 55.76,
    lng: 37.62,
    notableInvestments: ["Russian infrastructure", "VEB.RF", "Sberbank recapitalization"],
    defenseExposure: "High",
    techExposure: "Low",
    transparency: "Low",
    description: "Heavily depleted funding Ukraine war. Pre-war AUM ~$180B, now primarily domestic deployment. Western assets frozen under sanctions. Liquid reserves at historic lows."
  },
  {
    name: "Khazanah Nasional",
    country: "Malaysia",
    countryCode: "MY",
    aum: 38,
    founded: 1993,
    source: "Non-commodity",
    region: "Asia-Pacific",
    lat: 3.14,
    lng: 101.69,
    notableInvestments: ["CIMB", "Axiata", "IHH Healthcare", "Iskandar Malaysia"],
    defenseExposure: "Low",
    techExposure: "Medium",
    transparency: "Medium",
    description: "Malaysia's strategic investment fund. Focus on national champions and regional expansion. Underwent major portfolio rationalization in 2018-2019."
  },
  {
    name: "Turkey Wealth Fund",
    country: "Turkey",
    countryCode: "TR",
    aum: 75,
    founded: 2016,
    source: "Non-commodity",
    region: "Europe",
    lat: 39.93,
    lng: 32.85,
    notableInvestments: ["Turkish Airlines", "Borsa Istanbul", "Turkcell", "Ziraat Bank"],
    defenseExposure: "Medium",
    techExposure: "Low",
    transparency: "Low",
    description: "Consolidates major Turkish state assets. Controversial establishment — critics question governance. Manages stakes in Turkey's largest banks and telcos."
  },
  {
    name: "National Development Fund of Iran",
    country: "Iran",
    countryCode: "IR",
    aum: 139,
    founded: 2011,
    source: "Oil & Gas",
    region: "Middle East",
    lat: 35.69,
    lng: 51.39,
    notableInvestments: ["Domestic oil infrastructure", "IRGC-linked projects"],
    defenseExposure: "High",
    techExposure: "Low",
    transparency: "Low",
    description: "Heavily sanctioned. Funds diverted to military programs and proxy warfare. Actual accessible AUM likely far lower than stated due to frozen assets and sanctions."
  },
  {
    name: "Libya Investment Authority",
    country: "Libya",
    countryCode: "LY",
    aum: 67,
    founded: 2006,
    source: "Oil & Gas",
    region: "Africa",
    lat: 32.90,
    lng: 13.18,
    notableInvestments: ["Pearson", "Unicredit", "Finmeccanica (pre-civil war)"],
    defenseExposure: "Low",
    techExposure: "Low",
    transparency: "Low",
    description: "Frozen since 2011 civil war under UN sanctions. Contested between rival governments. ~$67B in frozen assets globally. Ongoing legal disputes over control."
  },
  {
    name: "Brunei Investment Agency",
    country: "Brunei",
    countryCode: "BN",
    aum: 60,
    founded: 1983,
    source: "Oil & Gas",
    region: "Asia-Pacific",
    lat: 4.94,
    lng: 114.95,
    notableInvestments: ["Dorchester Collection Hotels", "London real estate", "US equities"],
    defenseExposure: "None",
    techExposure: "Low",
    transparency: "Low",
    description: "One of the most opaque SWFs. Managed by Sultan's family office. Known for luxury hotel portfolio including The Dorchester and Beverly Hills Hotel."
  },
  {
    name: "Alaska Permanent Fund",
    country: "United States",
    countryCode: "US",
    aum: 78,
    founded: 1976,
    source: "Oil & Gas",
    region: "North America",
    lat: 58.30,
    lng: -134.42,
    notableInvestments: ["Global equities", "Real estate", "Infrastructure", "Private equity"],
    defenseExposure: "None",
    techExposure: "Medium",
    transparency: "High",
    description: "US state-level SWF distributing annual dividend to all Alaska residents. Model for universal basic income advocates. Well-governed with citizen oversight."
  },
  {
    name: "Texas Permanent School Fund",
    country: "United States",
    countryCode: "US",
    aum: 53,
    founded: 1854,
    source: "Oil & Gas",
    region: "North America",
    lat: 30.27,
    lng: -97.74,
    notableInvestments: ["Texas school funding", "US equities", "Fixed income"],
    defenseExposure: "None",
    techExposure: "Low",
    transparency: "High",
    description: "America's oldest SWF. Funds Texas public schools from oil/gas revenue and land investments. Over 170 years of continuous operation."
  },
  {
    name: "Ireland Strategic Investment Fund",
    country: "Ireland",
    countryCode: "IE",
    aum: 13,
    founded: 2014,
    source: "Non-commodity",
    region: "Europe",
    lat: 53.35,
    lng: -6.26,
    notableInvestments: ["Irish SMEs", "Renewable energy", "Housing infrastructure"],
    defenseExposure: "None",
    techExposure: "Medium",
    transparency: "High",
    description: "Post-crisis fund focused on domestic economic development. Successor to the National Pensions Reserve Fund. Emphasis on climate and housing."
  },
  {
    name: "New Zealand Super Fund",
    country: "New Zealand",
    countryCode: "NZ",
    aum: 48,
    founded: 2001,
    source: "Non-commodity",
    region: "Asia-Pacific",
    lat: -36.85,
    lng: 174.76,
    notableInvestments: ["Global equities", "Timber", "Rural land", "NZ infrastructure"],
    defenseExposure: "None",
    techExposure: "Medium",
    transparency: "High",
    description: "Pre-funds future New Zealand Superannuation costs. Strong ESG framework, excludes fossil fuels and cluster munitions manufacturers. Model transparency."
  },
  {
    name: "Nigerian Sovereign Investment Authority",
    country: "Nigeria",
    countryCode: "NG",
    aum: 3,
    founded: 2012,
    source: "Oil & Gas",
    region: "Africa",
    lat: 9.06,
    lng: 7.49,
    notableInvestments: ["Nigerian infrastructure", "Agriculture", "Domestic bonds"],
    defenseExposure: "None",
    techExposure: "Low",
    transparency: "Medium",
    description: "Small but growing. Three sub-funds: Stabilization, Future Generations, and Infrastructure. Challenges with consistent government contributions from oil revenue."
  },
  {
    name: "Samruk-Kazyna",
    country: "Kazakhstan",
    countryCode: "KZ",
    aum: 68,
    founded: 2008,
    source: "Oil & Gas",
    region: "Central Asia",
    lat: 51.17,
    lng: 71.45,
    notableInvestments: ["KazMunayGas", "Kazatomprom", "Air Astana", "Kazakhstan railways"],
    defenseExposure: "Low",
    techExposure: "Low",
    transparency: "Medium",
    description: "National wealth fund managing state-owned enterprises. Controls Kazakhstan's uranium (world's largest producer), oil, and transportation assets."
  },
  {
    name: "Oman Investment Authority",
    country: "Oman",
    countryCode: "OM",
    aum: 42,
    founded: 2020,
    source: "Oil & Gas",
    region: "Middle East",
    lat: 23.61,
    lng: 58.54,
    notableInvestments: ["OQ Energy", "Omantel", "Port of Duqm", "Oman Broadband"],
    defenseExposure: "Low",
    techExposure: "Low",
    transparency: "Medium",
    description: "Merged from two predecessor funds in 2020. Central to Oman Vision 2040 diversification. Focus on logistics hub development and green hydrogen."
  },
  {
    name: "Botswana Pula Fund",
    country: "Botswana",
    countryCode: "BW",
    aum: 4.9,
    founded: 1994,
    source: "Diamonds",
    region: "Africa",
    lat: -24.65,
    lng: 25.91,
    notableInvestments: ["Global fixed income", "International equities"],
    defenseExposure: "None",
    techExposure: "Low",
    transparency: "Medium",
    description: "Africa's best-governed SWF. Funded by diamond revenues (De Beers partnership). Model for resource-rich developing countries."
  }
];

export interface SWFAcquisition {
  fund: string;
  target: string;
  sector: string;
  value: number; // billions USD
  year: number;
  status: 'Completed' | 'Blocked' | 'Pending' | 'Divested';
  cfiusReview: boolean;
  country: string;
}

export const notableAcquisitions: SWFAcquisition[] = [
  { fund: "CIC", target: "Blackstone (9.9%)", sector: "Finance", value: 3.0, year: 2007, status: "Completed", cfiusReview: false, country: "US" },
  { fund: "QIA", target: "Rosneft (18.93%)", sector: "Energy", value: 11.3, year: 2016, status: "Completed", cfiusReview: false, country: "Russia" },
  { fund: "PIF", target: "Lucid Motors", sector: "EV/Tech", value: 3.5, year: 2018, status: "Completed", cfiusReview: false, country: "US" },
  { fund: "PIF", target: "Nintendo (8.6%)", sector: "Gaming", value: 4.0, year: 2022, status: "Completed", cfiusReview: false, country: "Japan" },
  { fund: "Mubadala", target: "GlobalFoundries", sector: "Semiconductors", value: 6.0, year: 2009, status: "Completed", cfiusReview: true, country: "US" },
  { fund: "ADIA", target: "Citigroup ($7.5B)", sector: "Finance", value: 7.5, year: 2007, status: "Completed", cfiusReview: false, country: "US" },
  { fund: "GIC", target: "UBS ($9.8B)", sector: "Finance", value: 9.8, year: 2007, status: "Completed", cfiusReview: false, country: "Switzerland" },
  { fund: "Temasek", target: "FTX", sector: "Crypto", value: 0.275, year: 2022, status: "Divested", cfiusReview: false, country: "US" },
  { fund: "CIC", target: "Thames Water", sector: "Infrastructure", value: 1.0, year: 2012, status: "Completed", cfiusReview: false, country: "UK" },
  { fund: "QIA", target: "Harrods", sector: "Retail", value: 1.5, year: 2010, status: "Completed", cfiusReview: false, country: "UK" },
  { fund: "PIF", target: "Jio Platforms", sector: "Telecom", value: 1.5, year: 2020, status: "Completed", cfiusReview: false, country: "India" },
  { fund: "ADIA", target: "Gatwick Airport (40%)", sector: "Infrastructure", value: 3.2, year: 2018, status: "Completed", cfiusReview: false, country: "UK" },
  { fund: "Norway GPFG", target: "Global equities (1.5%)", sector: "Diversified", value: 1700, year: 1996, status: "Completed", cfiusReview: false, country: "Global" },
  { fund: "CIC", target: "Logicor (Blackstone)", sector: "Logistics", value: 14.0, year: 2017, status: "Completed", cfiusReview: false, country: "Europe" },
  { fund: "PIF", target: "Posco Holdings", sector: "Steel/Materials", value: 1.2, year: 2023, status: "Completed", cfiusReview: false, country: "South Korea" },
  { fund: "Mubadala", target: "CEPSA (Carlyle)", sector: "Energy", value: 4.0, year: 2019, status: "Completed", cfiusReview: false, country: "Spain" },
  { fund: "GIC", target: "Global Logistic Properties", sector: "Logistics", value: 11.6, year: 2017, status: "Completed", cfiusReview: false, country: "Singapore" },
  { fund: "QIA", target: "Volkswagen (17%)", sector: "Automotive", value: 12.0, year: 2009, status: "Completed", cfiusReview: false, country: "Germany" },
];

export const regionColors: Record<string, string> = {
  "Middle East": "#f59e0b",
  "Asia-Pacific": "#ef4444",
  "Europe": "#3b82f6",
  "North America": "#10b981",
  "Africa": "#8b5cf6",
  "Central Asia": "#ec4899",
};

export const sourceColors: Record<string, string> = {
  "Oil & Gas": "#f59e0b",
  "Non-commodity": "#3b82f6",
  "Diamonds": "#a855f7",
};

export const totalGlobalAUM = swfData.reduce((sum, f) => sum + f.aum, 0);

export const regionBreakdown = swfData.reduce((acc, f) => {
  acc[f.region] = (acc[f.region] || 0) + f.aum;
  return acc;
}, {} as Record<string, number>);

export const sourceBreakdown = swfData.reduce((acc, f) => {
  acc[f.source] = (acc[f.source] || 0) + f.aum;
  return acc;
}, {} as Record<string, number>);
