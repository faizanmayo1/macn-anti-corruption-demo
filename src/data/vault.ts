// Confidentiality Vault & Tiered Access — the same incident (INC-08842) revealed
// only as far as a viewer is permitted. One record, three personas.

export type Persona = 'analyst' | 'member' | 'external'
export type FieldState = 'clear' | 'encrypted' | 'redacted' | 'abstracted' | 'aggregated' | 'hidden'

export interface PersonaDef {
  key: Persona
  name: string
  role: string
  org: string
  initials: string
  access: string
  tier: string
}

export const personas: PersonaDef[] = [
  { key: 'analyst', name: 'Sofia Marín', role: 'MACN Intelligence Analyst', org: 'MACN', initials: 'SM', access: 'Full record', tier: 'Restricted Vault' },
  { key: 'member', name: 'Member Company', role: 'Authorized member viewer', org: 'Shipping member', initials: 'MC', access: 'Anonymized record', tier: 'Member View' },
  { key: 'external', name: 'External Stakeholder', role: 'Regulator / NGO', org: 'External', initials: 'EX', access: 'Aggregated insight only', tier: 'Public layer' },
]

export interface RecordField {
  key: string
  label: string
  encrypted?: boolean
  values: Record<Persona, { text: string; state: FieldState }>
}

export const recordFields: RecordField[] = [
  { key: 'id', label: 'Incident ID', values: { analyst: { text: 'INC-08842', state: 'clear' }, member: { text: 'INC-08842', state: 'clear' }, external: { text: 'withheld', state: 'hidden' } } },
  { key: 'sf', label: 'Salesforce case', values: { analyst: { text: 'SF-44719', state: 'clear' }, member: { text: 'withheld', state: 'hidden' }, external: { text: 'withheld', state: 'hidden' } } },
  { key: 'master', label: 'Vessel master', encrypted: true, values: { analyst: { text: 'M. Okonkwo', state: 'encrypted' }, member: { text: '[vessel master]', state: 'redacted' }, external: { text: 'withheld', state: 'hidden' } } },
  { key: 'inspector', label: 'Port inspector', encrypted: true, values: { analyst: { text: 'A. Bello', state: 'encrypted' }, member: { text: '[port official]', state: 'redacted' }, external: { text: 'withheld', state: 'hidden' } } },
  { key: 'vessel', label: 'Vessel', encrypted: true, values: { analyst: { text: 'MV Celestine', state: 'encrypted' }, member: { text: '[vessel]', state: 'redacted' }, external: { text: 'withheld', state: 'hidden' } } },
  { key: 'company', label: 'Member company', encrypted: true, values: { analyst: { text: 'Meridian Shipping Ltd', state: 'encrypted' }, member: { text: '[member company]', state: 'redacted' }, external: { text: 'withheld', state: 'hidden' } } },
  { key: 'amount', label: 'Amount demanded', values: { analyst: { text: 'USD 4,500', state: 'clear' }, member: { text: '~USD 4.5K', state: 'abstracted' }, external: { text: 'withheld', state: 'hidden' } } },
  { key: 'location', label: 'Location', values: { analyst: { text: 'Berth 12, Apapa', state: 'clear' }, member: { text: 'Lagos / West Africa', state: 'abstracted' }, external: { text: 'West Africa', state: 'aggregated' } } },
  { key: 'date', label: 'Date', values: { analyst: { text: '14 Mar 2026', state: 'clear' }, member: { text: 'Q1 2026', state: 'abstracted' }, external: { text: '2026', state: 'aggregated' } } },
  { key: 'type', label: 'Incident type', values: { analyst: { text: 'Facilitation payment', state: 'clear' }, member: { text: 'Facilitation payment', state: 'clear' }, external: { text: 'Facilitation payment', state: 'aggregated' } } },
  { key: 'severity', label: 'Severity', values: { analyst: { text: 'Critical', state: 'clear' }, member: { text: 'Critical', state: 'clear' }, external: { text: 'withheld', state: 'hidden' } } },
]

export const narrativeByPersona: Record<Persona, { text: string; available: boolean }> = {
  analyst: { text: 'On 14 March, the master of MV Celestine, M. Okonkwo (Meridian Shipping Ltd), reported that inspector A. Bello demanded USD 4,500 in cash to release the vessel held at berth 12, Apapa.', available: true },
  member: { text: 'A vessel master reports an inspection-hold cash demand (~USD 4.5K) by a port inspector at Lagos / West Africa.', available: true },
  external: { text: 'Narrative not available at this access tier.', available: false },
}

export const externalAggregate = {
  stat: '213',
  context: 'facilitation-payment incidents recorded at West African ports in Q1 2026',
  risk: 'High-risk region',
  note: 'This incident contributes to regional statistics only. No incident-level detail, identities or narrative are exposed.',
}

export interface AccessLogEntry {
  id: string
  actor: string
  role: string
  action: string
  meta: string
  time: string
  tone: 'analyst' | 'system' | 'member' | 'external' | 'admin'
}

export const accessLog: AccessLogEntry[] = [
  { id: 'a1', actor: 'Sofia Marín', role: 'Analyst', action: 'Viewed full record', meta: 'INC-08842 · Restricted Vault', time: '2m ago', tone: 'analyst' },
  { id: 'a2', actor: 'Lodestar', role: 'System', action: 'Sanitized & dual-output', meta: 'INC-08842 → analytics layer', time: '1h ago', tone: 'system' },
  { id: 'a3', actor: 'Member viewer', role: 'Member', action: 'Viewed anonymized record', meta: 'Member View tier', time: '3h ago', tone: 'member' },
  { id: 'a4', actor: 'J. Okafor', role: 'Analyst', action: 'Decrypted field · company', meta: 'NDA grant · expires 22h', time: '4h ago', tone: 'admin' },
  { id: 'a5', actor: 'External API', role: 'Stakeholder', action: 'Pulled regional aggregate', meta: 'West Africa · Q1', time: '6h ago', tone: 'external' },
]

export interface TierArch {
  key: string
  name: string
  desc: string
  who: string
  count: string
  tone: 'vault' | 'insights' | 'member'
}

export const tierArch: TierArch[] = [
  { key: 'vault', name: 'Restricted Vault', desc: 'Raw sensitive reports, field-level encrypted', who: 'MACN administrators', count: '1,284 records', tone: 'vault' },
  { key: 'insights', name: 'Controlled Insights', desc: 'Correlated, pseudonymized intelligence', who: 'MACN analysts', count: '94,000 incidents', tone: 'insights' },
  { key: 'member', name: 'Member View', desc: 'Sanitized, analytics-safe outputs', who: '230 member organizations', count: 'aggregated only', tone: 'member' },
]

export const governanceControls = [
  { key: 'enc', label: 'Field-level encryption', detail: '4 attributes encrypted on this record', value: '4 fields' },
  { key: 'time', label: 'Time-based grants', detail: 'Temporary access auto-expires', value: '2 active' },
  { key: 'nda', label: 'NDA-based unlocking', detail: 'Dataset unlock requires signed NDA', value: '1 pending' },
  { key: 'log', label: 'Access logging', detail: 'Every record interaction recorded', value: 'All events' },
]
