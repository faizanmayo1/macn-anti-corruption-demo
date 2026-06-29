// Pattern Detection & Risk Intelligence — clustering, corridor detection,
// risk scoring and predictive forecasting. Builds on the sanitized analytics
// layer; centerpiece is the emerging Gulf of Guinea corridor.

export const corridorDetail = {
  id: 'COR-GOG',
  name: 'Gulf of Guinea corridor',
  status: 'Emerging' as const,
  typology: 'Inspection-hold cash demand',
  riskIndex: 82,
  trend: 11,
  correlatedReports: 23,
  structuredCases: 6,
  confidence: 0.92,
  leadDays: 19,
  severity: 'Critical',
  spine: [
    { code: 'NGAPP', name: 'Lagos (Apapa)', country: 'NG', risk: 84, reports: 13 },
    { code: 'TGLFW', name: 'Lomé', country: 'TG', risk: 79, reports: 6 },
    { code: 'GHTEM', name: 'Tema', country: 'GH', risk: 73, reports: 4 },
  ],
}

// Predictive corridor-risk forecast. `actual` is observed; `forecast` projects
// forward. Detection occurred at "Jun" — ahead of the formal-reporting threshold.
export const forecast = [
  { m: 'Jan', actual: 56 },
  { m: 'Feb', actual: 59 },
  { m: 'Mar', actual: 63 },
  { m: 'Apr', actual: 68 },
  { m: 'May', actual: 75 },
  { m: 'Jun', actual: 82, forecast: 82 },
  { m: 'Jul', forecast: 88 },
  { m: 'Aug', forecast: 93 },
  { m: 'Sep', forecast: 96 },
]
export const reportingThreshold = 90 // index at which it would surface in formal quarterly reporting

export interface Cluster {
  id: string
  label: string
  method: 'Typology' | 'Actor' | 'Vessel type' | 'Pattern'
  size: number
  ports: string
  status: 'Emerging' | 'Established' | 'Watch'
  confidence: number
  hero?: boolean
}

export const clusters: Cluster[] = [
  { id: 'CL-01', label: 'Inspection-hold cash demand', method: 'Typology', size: 23, ports: 'Lagos · Lomé · Tema', status: 'Emerging', confidence: 0.92, hero: true },
  { id: 'CL-02', label: 'Document fraud at clearance', method: 'Typology', size: 31, ports: 'Chittagong · Nhava Sheva', status: 'Established', confidence: 0.88 },
  { id: 'CL-03', label: 'Repeat actor · inspectorate unit', method: 'Actor', size: 14, ports: 'Lagos', status: 'Emerging', confidence: 0.84 },
  { id: 'CL-04', label: 'Tanker-class berth extortion', method: 'Vessel type', size: 18, ports: 'Manila · Tanjung Priok', status: 'Watch', confidence: 0.79 },
  { id: 'CL-05', label: 'Pre-holiday seasonal spike', method: 'Pattern', size: 27, ports: 'Multi-region', status: 'Established', confidence: 0.86 },
]

export interface RiskLens {
  key: string
  label: string
  subject: string
  score: number
  trend: number
  scale: string
}

export const riskLenses: RiskLens[] = [
  { key: 'port', label: 'Port-risk index', subject: 'Lagos (Apapa)', score: 84, trend: 13, scale: 'highest of 50 ports' },
  { key: 'route', label: 'Route-risk index', subject: 'Gulf of Guinea', score: 82, trend: 11, scale: 'highest of 20 corridors' },
  { key: 'actor', label: 'Actor-risk score', subject: 'Port inspectorate', score: 89, trend: 6, scale: 'highest of 9 actor types' },
]

export interface RouteRow {
  id: string
  name: string
  legs: string
  risk: number
  trend: number
  reports: number
}

export const routes: RouteRow[] = [
  { id: 'COR-GOG', name: 'Gulf of Guinea', legs: 'Lagos · Lomé · Tema', risk: 82, trend: 11, reports: 472 },
  { id: 'COR-BOB', name: 'Bay of Bengal', legs: 'Chittagong · Nhava Sheva', risk: 74, trend: 4, reports: 330 },
  { id: 'COR-SEA', name: 'SE Asia archipelago', legs: 'Manila · Tanjung Priok', risk: 63, trend: 3, reports: 253 },
  { id: 'COR-RSM', name: 'Red Sea — Mediterranean', legs: 'Port Said · Suez', risk: 57, trend: 1, reports: 188 },
  { id: 'COR-EAF', name: 'East Africa', legs: 'Durban · Mombasa', risk: 55, trend: -1, reports: 164 },
]

export interface ActorRow {
  type: string
  score: number
  incidents: number
}

export const actorRisk: ActorRow[] = [
  { type: 'Port inspector / state official', score: 89, incidents: 412 },
  { type: 'Customs officer', score: 76, incidents: 318 },
  { type: 'Terminal operator', score: 64, incidents: 221 },
  { type: 'Pilotage / berth agent', score: 58, incidents: 174 },
  { type: 'Police / security', score: 51, incidents: 132 },
]

export interface Threat {
  id: string
  tone: 'risk' | 'warning' | 'info'
  title: string
  detail: string
}

export const emergingThreats: Threat[] = [
  { id: 'ET-1', tone: 'risk', title: 'New typology named', detail: '“Inspection-hold cash demand” — first seen 11 days ago, now 23 reports' },
  { id: 'ET-2', tone: 'warning', title: 'Incident spike · Lagos (Apapa)', detail: '+18% over 30 days vs trailing 6-month baseline' },
  { id: 'ET-3', tone: 'info', title: 'Repeat actor signal', detail: 'Same inspectorate unit correlated across 14 sanitized reports' },
]
