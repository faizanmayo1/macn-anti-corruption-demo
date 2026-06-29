// Member Insight Portal — the member-facing safe view. A member company logs in
// and sees risk on THEIR routes, anonymized trends and mitigation insights —
// drawn only from the sanitized analytics layer. Zero sensitive leakage.

export const member = {
  name: 'Northwind Carriers',
  fleet: '38 vessels',
  routes: '12 active routes',
  regions: 'West Africa · South Asia',
  since: 'Member since 2019',
}

export const memberKpis = [
  { label: 'Ports on your routes', value: '17', sub: 'monitored' },
  { label: 'Flagged high-risk', value: '4', sub: 'on your routes', tone: 'risk' as const },
  { label: 'Regional risk trend', value: '▲ 8%', sub: 'West Africa · 30d', tone: 'risk' as const },
  { label: 'Mitigation insights', value: '6', sub: 'recommended', tone: 'azure' as const },
]

export type Band = 'high' | 'elevated' | 'watch' | 'clear'

export interface MemberPort {
  code: string
  name: string
  country: string
  risk: number
  trend: number
  band: Band
  advisory: string
}

export const yourPorts: MemberPort[] = [
  { code: 'NGAPP', name: 'Lagos (Apapa)', country: 'Nigeria', risk: 84, trend: 13, band: 'high', advisory: 'Inspection-hold cash demands rising — brief masters on refusal protocol' },
  { code: 'BDCGP', name: 'Chittagong', country: 'Bangladesh', risk: 81, trend: 4, band: 'high', advisory: 'Document-fraud demands at clearance — use pre-cleared paperwork pack' },
  { code: 'GHTEM', name: 'Tema', country: 'Ghana', risk: 73, trend: 7, band: 'high', advisory: 'Part of the Gulf of Guinea corridor — heightened watch' },
  { code: 'INNSA', name: 'Nhava Sheva', country: 'India', risk: 68, trend: 2, band: 'elevated', advisory: 'Stable; maintain standard anti-corruption procedures' },
  { code: 'ZADUR', name: 'Durban', country: 'South Africa', risk: 55, trend: -1, band: 'watch', advisory: 'Easing trend; no action required' },
]

export interface RegionRisk {
  region: string
  risk: number
  trend: number
}

export const regionRisk: RegionRisk[] = [
  { region: 'West Africa', risk: 82, trend: 11 },
  { region: 'South Asia', risk: 74, trend: 4 },
  { region: 'SE Asia', risk: 63, trend: 3 },
  { region: 'Mediterranean', risk: 57, trend: 1 },
  { region: 'Southern Africa', risk: 55, trend: -1 },
  { region: 'N Europe', risk: 12, trend: 0 },
]

// Anonymized incident trend across the member's operating regions
export const memberTrend = [
  { m: 'Jan', incidents: 24 },
  { m: 'Feb', incidents: 27 },
  { m: 'Mar', incidents: 31 },
  { m: 'Apr', incidents: 35 },
  { m: 'May', incidents: 41 },
  { m: 'Jun', incidents: 47 },
]

export interface Mitigation {
  id: string
  title: string
  detail: string
  port: string
  impact: string
}

export const mitigations: Mitigation[] = [
  { id: 'M1', title: 'Pre-clearance documentation pack', detail: 'Standardized paperwork removes the discretionary leverage behind inspection holds.', port: 'Lagos (Apapa)', impact: 'High impact' },
  { id: 'M2', title: 'Brief masters on the refusal protocol', detail: 'Deploy the MACN “Say No” toolkit across Gulf of Guinea port calls.', port: 'Gulf of Guinea', impact: 'High impact' },
  { id: 'M3', title: 'Add clearance time buffer', detail: '71% of demands correlate with schedule pressure — build slack at high-risk calls.', port: 'Chittagong', impact: 'Medium impact' },
  { id: 'M4', title: 'Alternative-berth advisory', detail: 'Lower-risk berths flagged at Tema for sensitive cargo windows.', port: 'Tema', impact: 'Medium impact' },
]

export interface MemberReport {
  id: string
  name: string
  desc: string
  format: string
}

export const memberReports: MemberReport[] = [
  { id: 'R1', name: 'West Africa Q1 risk report', desc: 'Regional trends & port indices', format: 'PDF' },
  { id: 'R2', name: 'Your route-exposure summary', desc: '17 ports across 12 routes', format: 'PDF + CSV' },
  { id: 'R3', name: 'Board-ready corruption brief', desc: 'Executive risk overview', format: 'PDF' },
]

export const sharingRules = [
  { rule: 'Aggregated regional intelligence', state: 'Shared with you', tone: 'on' as const },
  { rule: 'Port-level risk indicators', state: 'Shared with you', tone: 'on' as const },
  { rule: 'Incident-level detail & identities', state: 'Never shared', tone: 'off' as const },
  { rule: 'Your own submissions', state: 'Confidential to MACN', tone: 'off' as const },
]
