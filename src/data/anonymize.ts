// AI Anonymization & Redaction Engine — the hero transform for INC-08842.
// One source of truth drives both the RAW (highlighted entities) and the
// SANITIZED (redacted/abstracted) renderings, plus the explainability ledger.

export type EntityAction = 'Redacted' | 'Abstracted' | 'Generalized'
export type SensitivityTier = 'highly' | 'sensitive' | 'internal'

export interface Entity {
  id: string
  raw: string
  replacement: string
  type: string
  action: EntityAction
  reason: string
  tier: SensitivityTier
  rule: string
}

export const entities: Record<string, Entity> = {
  e7: { id: 'e7', raw: '14 March', replacement: 'Q1', type: 'Date / time', action: 'Generalized', reason: 'Temporal precision can narrow a case to one voyage.', tier: 'internal', rule: 'MACN policy · temporal generalization' },
  e4: { id: 'e4', raw: 'MV Celestine', replacement: '[vessel]', type: 'Vessel name', action: 'Redacted', reason: 'Identifies the company, voyage and crew.', tier: 'highly', rule: 'MACN policy · direct-identifier removal' },
  e1: { id: 'e1', raw: 'M. Okonkwo', replacement: '[vessel master]', type: 'Person · vessel master', action: 'Redacted', reason: 'Direct personal identifier (PII) of the reporter.', tier: 'highly', rule: 'MACN policy · reporter protection' },
  e5: { id: 'e5', raw: 'Meridian Shipping Ltd', replacement: '[member company]', type: 'Organization · member', action: 'Redacted', reason: 'Member confidentiality — company must not be attributable.', tier: 'highly', rule: 'Member-level rule · company shielding' },
  e2: { id: 'e2', raw: 'A. Bello', replacement: '[port official]', type: 'Person · port inspector', action: 'Redacted', reason: 'Direct identifier of a named individual.', tier: 'highly', rule: 'MACN policy · direct-identifier removal' },
  e3: { id: 'e3', raw: 'USD 4,500', replacement: '~USD 4.5K', type: 'Monetary amount', action: 'Generalized', reason: 'Exact figure could re-identify the incident.', tier: 'sensitive', rule: 'MACN policy · figure banding' },
  e6: { id: 'e6', raw: 'berth 12, Apapa', replacement: 'Lagos / West Africa', type: 'Granular location', action: 'Abstracted', reason: 'Berth-level detail abstracted to region.', tier: 'sensitive', rule: 'MACN policy · location abstraction' },
}

export type Token = { t: 'text'; v: string } | { t: 'entity'; id: string }

// Order of entities top-to-bottom in the narrative (drives ledger + reveal stagger)
export const entityOrder = ['e7', 'e4', 'e1', 'e5', 'e2', 'e3', 'e6']

export const narrative: Token[] = [
  { t: 'text', v: 'On ' },
  { t: 'entity', id: 'e7' },
  { t: 'text', v: ', the master of ' },
  { t: 'entity', id: 'e4' },
  { t: 'text', v: ', ' },
  { t: 'entity', id: 'e1' },
  { t: 'text', v: ' (' },
  { t: 'entity', id: 'e5' },
  { t: 'text', v: '), reported that inspector ' },
  { t: 'entity', id: 'e2' },
  { t: 'text', v: ' demanded ' },
  { t: 'entity', id: 'e3' },
  { t: 'text', v: ' in cash to release the vessel held at ' },
  { t: 'entity', id: 'e6' },
  { t: 'text', v: '. The master refused; the vessel was delayed 26 hours before release.' },
]

export const source = {
  incidentId: 'INC-08842',
  salesforceCase: 'SF-44719',
  channel: 'Seafarer HelpDesk report',
  receivedVia: 'MACN HelpDesk · secure intake',
  port: 'Lagos (Apapa), Nigeria',
  words: 58,
}

export const classification = {
  tier: 'highly' as SensitivityTier,
  label: 'Highly Sensitive',
  confidence: 0.96,
  reason: 'Contains named individuals, a member company, a vessel and a precise location tied to an active allegation.',
}

export const tiers = [
  { key: 'public', label: 'Public-safe', desc: 'Shareable openly' },
  { key: 'internal', label: 'Internal-only', desc: 'MACN staff' },
  { key: 'sensitive', label: 'Sensitive', desc: 'Restricted analysts' },
  { key: 'highly', label: 'Highly Sensitive', desc: 'Vault + named access' },
]

// Analytical signal deliberately PRESERVED in the sanitized record
export const preservedSignal = [
  { label: 'Incident type', value: 'Facilitation payment' },
  { label: 'Typology', value: 'Inspection-hold cash demand' },
  { label: 'Actor type', value: 'Port inspector (state official)' },
  { label: 'Mechanism', value: 'Vessel hold → cash demand' },
  { label: 'Region', value: 'Lagos / West Africa' },
  { label: 'Severity', value: 'Critical' },
  { label: 'Outcome', value: 'Refused · 26h delay' },
  { label: 'Corridor link', value: 'Gulf of Guinea' },
]

export const outputs = [
  {
    key: 'vault',
    name: 'Raw Secure Vault',
    tone: 'vault' as const,
    desc: 'Full original retained, field-level encrypted. Restricted to MACN administrators; every access logged.',
    chips: ['Encrypted at rest', 'MACN admins only', 'Access-logged', 'NDA-unlockable'],
  },
  {
    key: 'safe',
    name: 'Sanitized Analytics Dataset',
    tone: 'safe' as const,
    desc: 'AI-safe record with no direct identifiers. Feeds pattern detection, risk scoring and member insights.',
    chips: ['No PII', 'Pattern-detection ready', 'Member-shareable', 'Re-identification checked'],
  },
]

export const privacyRules = [
  { scope: 'MACN policy', detail: 'Remove direct identifiers; band figures; abstract locations', count: 5 },
  { scope: 'Member-level', detail: 'Shield member company from attribution', count: 1 },
  { scope: 'Case-level', detail: 'Highly-sensitive tag → vault + named access', count: 1 },
]
