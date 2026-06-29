// Lodestar Copilot & Decision Audit — natural-language Q&A over the sanitized
// analytics layer. Every answer is cited and backed by a traceable rationale;
// the copilot never surfaces restricted-vault content.

export interface Conversation {
  id: string
  prompt: string
  answer: {
    lead: string
    points: string[]
    citations: string[]
  }
  audit: {
    sources: string[]
    steps: string[]
    confidence: number
    tier: string
    excluded: string[]
  }
}

export const conversations: Conversation[] = [
  {
    id: 'q1',
    prompt: 'Where is corruption risk rising fastest this quarter?',
    answer: {
      lead: 'The Gulf of Guinea corridor is rising fastest — an emerging bribery corridor across Lagos (Apapa), Lomé and Tema.',
      points: [
        'Route-risk index 82 (▲11 pts this quarter) — the largest move of any corridor.',
        'Driven by a shared “inspection-hold cash demand” typology repeating across 3 ports.',
        'Detected 19 days ahead of formal quarterly reporting.',
      ],
      citations: ['23 sanitized reports', '6 Salesforce cases', 'Cluster CL-01', 'Route-risk model'],
    },
    audit: {
      sources: ['23 sanitized qualitative reports', '6 Salesforce incident cases', 'Port & corridor risk indices'],
      steps: [
        'Filtered the sanitized layer to Q2 incidents',
        'Clustered by typology, actor and geography',
        'Ranked corridors by risk-index delta',
        'Gulf of Guinea highest (+11) → surfaced',
      ],
      confidence: 0.92,
      tier: 'Analyst · Controlled Insights',
      excluded: ['Raw identities', 'Restricted-vault records'],
    },
  },
  {
    id: 'q2',
    prompt: 'What’s driving incidents at Lagos (Apapa)?',
    answer: {
      lead: 'At Lagos (Apapa), incidents are driven by inspection-hold cash demands from port inspectors — up 18% over 30 days.',
      points: [
        'Dominant typology: facilitation payments tied to vessel holds (≈61% of reports).',
        'Primary actor type: port inspector / state official (actor-risk 89).',
        'Port-risk index 84 (▲13) — now the highest of 50 ports.',
      ],
      citations: ['213 incidents', 'Actor-risk model', 'Port-risk index'],
    },
    audit: {
      sources: ['213 sanitized Lagos incidents', 'Actor-type risk scores', 'Port-risk index'],
      steps: [
        'Scoped sanitized incidents to port NGAPP',
        'Aggregated by typology and actor type',
        'Compared 30-day vs trailing 6-month baseline',
        'Surfaced top driver + actor',
      ],
      confidence: 0.9,
      tier: 'Analyst · Controlled Insights',
      excluded: ['Vessel & company names', 'Restricted-vault records'],
    },
  },
  {
    id: 'q3',
    prompt: 'Which ports on member routes need mitigation first?',
    answer: {
      lead: 'Prioritize Lagos (Apapa), Chittagong and Tema — the three high-risk ports on the most member routes.',
      points: [
        'Lagos & Chittagong both exceed the high-risk threshold (84 and 81).',
        'Recommended: pre-clearance documentation packs + master refusal briefings.',
        'Tema is flagged via the Gulf of Guinea corridor — heightened watch.',
      ],
      citations: ['Port-risk indices', 'Member route overlap', 'Mitigation library'],
    },
    audit: {
      sources: ['Port-risk indices (50 ports)', 'Member route overlap (aggregated)', 'Mitigation library'],
      steps: [
        'Intersected high-risk ports with member route coverage',
        'Ranked by risk × route exposure',
        'Matched each to recommended mitigations',
      ],
      confidence: 0.88,
      tier: 'Member-safe · aggregated',
      excluded: ['Other members’ data', 'Incident-level detail'],
    },
  },
]

export const capabilities = [
  'Ask in natural language across the sanitized analytics layer',
  'Every answer cited to its source records',
  'Traceable decision rationale for each recommendation',
  'Respects access tier — never surfaces restricted-vault content',
  'Scenario prompts (“what if trade volume rises in region X”)',
  'One-click escalation to MACN analysts',
]
