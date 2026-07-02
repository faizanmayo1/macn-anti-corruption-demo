// MACN OS — core demo dataset. A pilot-scale, internally consistent world threaded
// around the hero case INC-08842 (a sensitive facilitation-payment report at Lagos/Apapa)
// and the emerging Gulf of Guinea bribery corridor that Lodestar detects early.

export const macn = {
  // Data scale (grounded in MACN's real footprint: ~70k anonymous GPIP incident
  // reports, ~230 member shipping companies, 1,350+ ports covered)
  structuredIncidents: 70000, // anonymous incident reports in GPIP / Salesforce
  qualitativeReports: 24000, // free-text report comments + HelpDesk emails to enrich
  totalIncidents: 94000,
  highRiskCases: 1000,
  ports: 1350, // ports covered by the Global Port Integrity Platform (GPIP)
  corridors: 20,
  members: 230, // member shipping companies
  yearsHistory: 5,

  // Anonymization throughput (Lodestar safe-data pipeline)
  autoSanitizedPct: 98.7,
  reportsIngestedToday: 42,
  vaultRestricted: 1284, // raw sensitive records in the restricted vault
  pendingReview: 7, // highly-sensitive items awaiting analyst confirmation

  // Live posture
  globalRiskIndex: 63, // 0–100 network-wide
  globalRiskTrendPp: 4, // ▲ pts over 30d
  activeAlerts: 3,
  portsHighRisk: 9, // ports above the 70 threshold
  salesforceSync: 'live', // bi-directional sync status
} as const

export const persona = {
  name: 'Sofia Marín',
  role: 'Intelligence Analyst',
  initials: 'SM',
  clearance: 'MACN · Full access',
}

// Top-of-shell intelligence ticker
export const ticker = [
  'Lodestar flagged an emerging bribery corridor · Gulf of Guinea',
  'Lagos (Apapa) port-risk index 71 → 84 over 30d',
  '42 qualitative reports ingested today · 98.7% auto-sanitized',
  'INC-08842 redacted & linked to Salesforce case SF-44719',
  'New typology detected: inspection-hold cash demand',
  '1,284 raw reports secured in restricted vault',
  'Bi-directional Salesforce sync · live',
]

// ── Global risk map: ports (subset of 50, normalized x/y over a world plate) ──
export type RiskBand = 'high' | 'elevated' | 'watch' | 'clear'

export interface Port {
  code: string
  name: string
  country: string
  region: string
  risk: number // 0–100 port-risk index
  trend: number // pts change over 30d
  incidents: number
  band: RiskBand
  x: number // 0–100 (lon mapped)
  y: number // 0–100 (lat mapped)
  hero?: boolean
}

export const ports: Port[] = [
  { code: 'NGAPP', name: 'Lagos (Apapa)', country: 'Nigeria', region: 'West Africa', risk: 84, trend: 13, incidents: 213, band: 'high', x: 50.9, y: 46.4, hero: true },
  { code: 'TGLFW', name: 'Lomé', country: 'Togo', region: 'West Africa', risk: 79, trend: 9, incidents: 141, band: 'high', x: 50.3, y: 46.6 },
  { code: 'GHTEM', name: 'Tema', country: 'Ghana', region: 'West Africa', risk: 73, trend: 7, incidents: 118, band: 'high', x: 50.0, y: 46.9 },
  { code: 'BDCGP', name: 'Chittagong', country: 'Bangladesh', region: 'South Asia', risk: 81, trend: 4, incidents: 176, band: 'high', x: 75.5, y: 37.6 },
  { code: 'INNSA', name: 'Nhava Sheva', country: 'India', region: 'South Asia', risk: 68, trend: 2, incidents: 154, band: 'elevated', x: 70.3, y: 39.5 },
  { code: 'PHMNL', name: 'Manila', country: 'Philippines', region: 'SE Asia', risk: 64, trend: 3, incidents: 132, band: 'elevated', x: 83.6, y: 41.9 },
  { code: 'BRSSZ', name: 'Santos', country: 'Brazil', region: 'South America', risk: 59, trend: -2, incidents: 109, band: 'elevated', x: 37.1, y: 63.3 },
  { code: 'EGPSD', name: 'Port Said', country: 'Egypt', region: 'Mediterranean', risk: 57, trend: 1, incidents: 96, band: 'watch', x: 58.9, y: 32.6 },
  { code: 'ZADUR', name: 'Durban', country: 'South Africa', region: 'Southern Africa', risk: 55, trend: -1, incidents: 88, band: 'watch', x: 58.6, y: 66.6 },
  { code: 'IDTPP', name: 'Tanjung Priok', country: 'Indonesia', region: 'SE Asia', risk: 61, trend: 2, incidents: 121, band: 'elevated', x: 80.0, y: 51.5 },
  { code: 'SGSIN', name: 'Singapore', country: 'Singapore', region: 'SE Asia', risk: 18, trend: 0, incidents: 14, band: 'clear', x: 78.8, y: 49.3 },
  { code: 'NLRTM', name: 'Rotterdam', country: 'Netherlands', region: 'N Europe', risk: 12, trend: 0, incidents: 9, band: 'clear', x: 51.1, y: 21.1 },
  { code: 'USHOU', name: 'Houston', country: 'United States', region: 'N America', risk: 22, trend: 1, incidents: 19, band: 'clear', x: 23.5, y: 33.5 },
]

export const heroCorridor = {
  id: 'COR-GOG',
  name: 'Gulf of Guinea corridor',
  legs: ['Lagos (Apapa)', 'Lomé', 'Tema'],
  riskIndex: 82,
  trend: 11,
  incidents: 472,
  windowDays: 60,
  correlatedReports: 23,
  detectedDaysEarly: 19,
}

// ── Lodestar AI digest (Command Center spotlight) ──
export const lodestarDigest = {
  headline: 'An emerging bribery corridor is forming across the Gulf of Guinea.',
  body:
    'Lodestar correlated 23 sanitized qualitative reports with structured Salesforce incidents over the last 60 days across Lagos (Apapa), Lomé and Tema. A shared typology — cash facilitation demands tied to inspection holds — is repeating across three ports. Corridor risk is up 11 pts; Lagos crossed the high-risk threshold (71 → 84). This pattern is surfacing 19 days before it would appear in formal quarterly reporting.',
  confidence: 0.92,
  basis: ['23 qualitative reports', '6 Salesforce cases', '3 ports', '60-day window'],
}

export interface Alert {
  id: string
  tone: 'risk' | 'warning' | 'info'
  title: string
  detail: string
  meta: string
}

export const earlyWarnings: Alert[] = [
  { id: 'EW-2207', tone: 'risk', title: 'Bribery corridor forming · Gulf of Guinea', detail: 'Lagos · Lomé · Tema — shared inspection-hold cash-demand typology', meta: '19 days early · 23 reports' },
  { id: 'EW-2206', tone: 'warning', title: 'Lagos (Apapa) crossed high-risk threshold', detail: 'Port-risk index 71 → 84 over 30 days', meta: '+13 pts · 30d' },
  { id: 'EW-2205', tone: 'info', title: 'New corruption typology detected', detail: '“Inspection-hold cash demand” clustered into a named pattern', meta: 'first seen 11d ago' },
]

// Live intake — qualitative submissions being structured & sanitized by Lodestar
export interface IntakeItem {
  id: string
  source: string
  port: string
  type: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  status: 'sanitizing' | 'structured' | 'linked'
  ago: string
}

export const incidentFeed: IntakeItem[] = [
  { id: 'INC-08842', source: 'Seafarer HelpDesk report', port: 'Lagos (Apapa)', type: 'Facilitation payment', severity: 'critical', status: 'linked', ago: '4m' },
  { id: 'INC-08841', source: 'Incident report comment', port: 'Lomé', type: 'Inspection-hold demand', severity: 'high', status: 'structured', ago: '22m' },
  { id: 'INC-08840', source: 'Member submission', port: 'Chittagong', type: 'Document fraud', severity: 'high', status: 'sanitizing', ago: '38m' },
  { id: 'INC-08839', source: 'Incident report comment', port: 'Tema', type: 'Cash demand', severity: 'medium', status: 'structured', ago: '1h' },
  { id: 'INC-08838', source: 'HelpDesk email', port: 'Nhava Sheva', type: 'Extortion', severity: 'medium', status: 'linked', ago: '2h' },
  { id: 'INC-08837', source: 'Member submission', port: 'Manila', type: 'Facilitation payment', severity: 'low', status: 'structured', ago: '3h' },
]

// 12-month incident intake (structured vs qualitative) for the trend chart
export const incidentTrend = [
  { m: 'Jul', structured: 712, qualitative: 318 },
  { m: 'Aug', structured: 698, qualitative: 332 },
  { m: 'Sep', structured: 740, qualitative: 351 },
  { m: 'Oct', structured: 769, qualitative: 372 },
  { m: 'Nov', structured: 758, qualitative: 365 },
  { m: 'Dec', structured: 731, qualitative: 349 },
  { m: 'Jan', structured: 802, qualitative: 401 },
  { m: 'Feb', structured: 821, qualitative: 423 },
  { m: 'Mar', structured: 858, qualitative: 447 },
  { m: 'Apr', structured: 884, qualitative: 472 },
  { m: 'May', structured: 909, qualitative: 498 },
  { m: 'Jun', structured: 948, qualitative: 531 },
]

// Corruption typology mix (sanitized analytics layer)
export const typologyMix = [
  { type: 'Facilitation payments', share: 34, count: 5100 },
  { type: 'Inspection-hold demands', share: 21, count: 3150 },
  { type: 'Document fraud', share: 15, count: 2250 },
  { type: 'Extortion / threats', share: 12, count: 1800 },
  { type: 'Cargo-clearance bribery', share: 10, count: 1500 },
  { type: 'Other', share: 8, count: 1200 },
]
