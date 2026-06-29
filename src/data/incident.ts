// Incident Intelligence View — the unified "Incident Intelligence Object":
// the Salesforce system-of-record record enriched with linked qualitative reports,
// normalized taxonomy, AI fields pushed back to Salesforce, and versioned history.

export const incidentObject = {
  id: 'INC-08842',
  sfCase: 'SF-44719',
  title: 'Facilitation payment — inspection hold, Lagos (Apapa)',
  status: 'Under review',
  severity: 'Critical',
  port: 'Lagos (Apapa)',
  region: 'West Africa',
  corridor: 'Gulf of Guinea',
  version: 5,
  linkedCount: 4,
}

export interface StructuredField {
  label: string
  value: string
}

// From Salesforce — the system of record (unchanged, never duplicated)
export const structuredFields: StructuredField[] = [
  { label: 'Case ID', value: 'SF-44719' },
  { label: 'Status', value: 'Under review' },
  { label: 'Reporter type', value: 'Vessel master' },
  { label: 'Port', value: 'Lagos (Apapa) · NGAPP' },
  { label: 'Vessel type', value: 'Bulk carrier' },
  { label: 'Incident type', value: 'Facilitation payment' },
  { label: 'Severity', value: 'Critical' },
  { label: 'Date opened', value: '14 Mar 2026' },
  { label: 'Resolution', value: 'Released · 26h delay' },
  { label: 'Member', value: '[anonymized]' },
]

export interface LinkedReport {
  id: string
  source: string
  kind: 'Whistleblower' | 'NGO report' | 'Member submission' | 'Port intel'
  snippet: string
  severity: 'critical' | 'high' | 'medium'
  confidence: number
  hero?: boolean
}

export const linkedReports: LinkedReport[] = [
  { id: 'INC-08842', source: 'Whistleblower narrative', kind: 'Whistleblower', snippet: 'Inspection-hold cash demand (~USD 4.5K) by a port inspector at Lagos / West Africa.', severity: 'critical', confidence: 0.97, hero: true },
  { id: 'QR-2210', source: 'NGO maritime watch', kind: 'NGO report', snippet: 'Repeated facilitation demands reported by crews at Apapa berths over Q1.', severity: 'high', confidence: 0.88 },
  { id: 'QR-2204', source: 'Member submission', kind: 'Member submission', snippet: 'Vessel held pending an informal “processing fee” before clearance at Lagos.', severity: 'high', confidence: 0.84 },
  { id: 'QR-2191', source: 'Port-level intelligence', kind: 'Port intel', snippet: 'Local inspectorate unit flagged for repeated cash demands on bulk carriers.', severity: 'medium', confidence: 0.79 },
]

export interface TaxonomyMap {
  raw: string
  normalized: string
  field: string
}

export const taxonomyMappings: TaxonomyMap[] = [
  { raw: '“cash to release / processing fee”', normalized: 'Facilitation payment', field: 'Incident type' },
  { raw: '“Apapa, berth 12”', normalized: 'Lagos (Apapa) · NGAPP', field: 'Port' },
  { raw: '“inspector / inspectorate”', normalized: 'Port inspector', field: 'Actor type' },
  { raw: '“held the vessel 26 hours”', normalized: 'Vessel hold', field: 'Mechanism' },
]

export const aiEnrichment = {
  summary: 'Lodestar linked 4 qualitative reports to this Salesforce case, normalized the taxonomy, anonymized identities, scored severity Critical, and connected it to the emerging Gulf of Guinea corridor.',
  stats: [
    { label: 'Reports linked', value: '4' },
    { label: 'Taxonomy maps', value: '4' },
    { label: 'Severity', value: 'Critical' },
    { label: 'Corridor', value: 'Gulf of Guinea' },
  ],
}

export interface PushedField {
  field: string
  value: string
}

// AI-generated fields written BACK into Salesforce (no new system of record)
export const pushedFields: PushedField[] = [
  { field: 'Risk score', value: '84' },
  { field: 'Typology', value: 'Inspection-hold cash demand' },
  { field: 'Corridor link', value: 'Gulf of Guinea (COR-GOG)' },
  { field: 'Anonymized summary', value: 'Inspection-hold cash demand, Lagos / West Africa' },
  { field: 'Linked reports', value: '4 qualitative' },
]

export const syncStatus = {
  direction: 'Bi-directional',
  lastSync: '2m ago',
  pushed: 5,
  note: 'Salesforce remains the system of record — no duplication.',
}

export interface Version {
  v: number
  label: string
  actor: string
  time: string
  change: string
}

export const versions: Version[] = [
  { v: 1, label: 'Salesforce case created', actor: 'Salesforce', time: '14 Mar', change: 'Structured incident record opened' },
  { v: 2, label: 'Taxonomy normalized', actor: 'Lodestar', time: '14 Mar', change: 'Mapped free-text to MACN taxonomy' },
  { v: 3, label: 'Qualitative reports linked', actor: 'Lodestar', time: '15 Mar', change: '4 reports correlated & linked' },
  { v: 4, label: 'Anonymized', actor: 'Lodestar', time: '15 Mar', change: 'Identities redacted; safe version created' },
  { v: 5, label: 'Risk-scored & corridor-linked', actor: 'Lodestar', time: '16 Mar', change: 'Severity Critical · Gulf of Guinea' },
]
