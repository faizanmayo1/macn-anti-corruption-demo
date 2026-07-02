// Audit & Data Lineage — end-to-end traceability for an AI-generated insight.
// Trace the Gulf of Guinea corridor alert from final output back to raw sources.

export type StageKind = 'source' | 'transform' | 'anonymize' | 'ai' | 'insight'

export interface LineageNode {
  id: string
  stage: string
  title: string
  summary: string
  actor: string
  time: string
  hash: string
  detail: string
  inputs: string
  output: string
  kind: StageKind
}

export const lineage: LineageNode[] = [
  {
    id: 'n1', stage: 'Sources', title: '29 source records', summary: '23 qualitative reports + 6 Salesforce cases',
    actor: 'Ingestion service', time: 'T-60d → T-0', hash: '9f2a…c71b', kind: 'source',
    detail: 'Seafarer HelpDesk reports, free-text incident-report comments and member submissions ingested via the secure member portal, plus structured Salesforce incident records.',
    inputs: 'HelpDesk · Report comments · Salesforce', output: '29 raw records → Restricted Vault',
  },
  {
    id: 'n2', stage: 'Normalization', title: 'Taxonomy & entity normalization', summary: 'Ports, regions, actors, typology standardized',
    actor: 'Lodestar', time: 'T-0 +2s', hash: 'b41e…08ad', kind: 'transform',
    detail: 'Free-text mapped to the MACN taxonomy: ports → standard codes, actors → role types, incident language → canonical typology.',
    inputs: '29 raw records', output: 'Normalized incident objects',
  },
  {
    id: 'n3', stage: 'Anonymization', title: 'Redaction & abstraction', summary: '7 entities/report redacted or abstracted',
    actor: 'Lodestar · safe-data engine', time: 'T-0 +4s', hash: 'c7d3…1f90', kind: 'anonymize',
    detail: 'Direct identifiers removed, figures banded, berth-level locations abstracted to region — explainability log retained for every transformation.',
    inputs: 'Normalized objects', output: 'Sanitized analytics records (no PII)',
  },
  {
    id: 'n4', stage: 'Correlation', title: 'Cross-source clustering', summary: 'Grouped 23 reports by shared typology · 3 ports',
    actor: 'Lodestar', time: 'T-0 +6s', hash: 'd0a8…4e22', kind: 'ai',
    detail: 'Sanitized records clustered by typology, actor and geography; cluster CL-01 “inspection-hold cash demand” surfaced across Lagos, Lomé and Tema.',
    inputs: 'Sanitized records', output: 'Cluster CL-01 (23 members)',
  },
  {
    id: 'n5', stage: 'Risk scoring', title: 'Corridor risk index', summary: 'Route-risk computed 82 (▲11)',
    actor: 'Lodestar', time: 'T-0 +7s', hash: 'e9b1…77c4', kind: 'ai',
    detail: 'Cluster volume, severity and trend combined into the Gulf of Guinea route-risk index; trajectory projected past the formal-reporting threshold.',
    inputs: 'Cluster CL-01 · port indices', output: 'Route-risk 82 · forecast',
  },
  {
    id: 'n6', stage: 'Insight', title: 'Gulf of Guinea corridor alert', summary: 'Emerging · raised 19 days early',
    actor: 'Lodestar', time: 'T-0 +7s', hash: 'fa55…9d30', kind: 'insight',
    detail: 'Final intelligence output: an emerging-corridor alert with confidence 92%, routed to analysts ahead of formal quarterly reporting.',
    inputs: 'Route-risk · forecast', output: 'Alert EW-2207 → analysts',
  },
]

export type AuditCategory = 'Ingestion' | 'Anonymization' | 'Transform' | 'Access' | 'Report'

export interface AuditEvent {
  id: string
  category: AuditCategory
  detail: string
  actor: string
  time: string
  hash: string
}

export const auditEvents: AuditEvent[] = [
  { id: 'L1', category: 'Ingestion', detail: 'Ingested 23 qualitative reports + 6 Salesforce cases', actor: 'Ingestion service', time: '2026-06-29 09:02', hash: '9f2a…c71b' },
  { id: 'L2', category: 'Transform', detail: 'Normalized taxonomy across 29 records', actor: 'Lodestar', time: '2026-06-29 09:02', hash: 'b41e…08ad' },
  { id: 'L3', category: 'Anonymization', detail: 'Anonymized INC-08842 + 22 reports (161 entities)', actor: 'Lodestar', time: '2026-06-29 09:02', hash: 'c7d3…1f90' },
  { id: 'L4', category: 'Transform', detail: 'Correlated cluster CL-01 across 3 ports', actor: 'Lodestar', time: '2026-06-29 09:02', hash: 'd0a8…4e22' },
  { id: 'L5', category: 'Transform', detail: 'Computed corridor risk index 82 (▲11)', actor: 'Lodestar', time: '2026-06-29 09:02', hash: 'e9b1…77c4' },
  { id: 'L6', category: 'Report', detail: 'Generated corridor alert EW-2207', actor: 'Lodestar', time: '2026-06-29 09:02', hash: 'fa55…9d30' },
  { id: 'L7', category: 'Access', detail: 'Analyst S. Marín viewed insight & lineage', actor: 'Sofia Marín', time: '2026-06-29 09:14', hash: '1c44…ab9e' },
  { id: 'L8', category: 'Report', detail: 'Compliance package exported (PDF + JSON)', actor: 'Sofia Marín', time: '2026-06-29 09:18', hash: '7be0…d213' },
]

export const exportPackage = {
  name: 'Compliance package · EW-2207',
  contents: [
    'Source manifest (29 records)',
    'Anonymization & explainability log',
    'Full audit trail (immutable)',
    'Access log',
    'Methodology & model card',
    'Lineage graph (this view)',
  ],
  formats: ['PDF', 'JSON'],
  integrity: 'SHA-256 sealed · tamper-evident',
  size: '4.2 MB',
}
