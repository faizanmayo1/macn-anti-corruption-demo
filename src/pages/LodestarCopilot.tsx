import { Bot } from 'lucide-react'

import { ScreenScaffold } from '@/components/blueprint/ScreenScaffold'

export function LodestarCopilot() {
  return (
    <ScreenScaffold
      eyebrow="Assistant · Ask · Explain · Trace"
      title="Lodestar Copilot & Decision Audit"
      description="A natural-language way to interrogate the sanitized intelligence layer — every answer grounded in governed data and backed by a traceable rationale, so leadership can trust and defend each insight."
      icon={Bot}
      features={[
        'Natural-language Q&A over the sanitized analytics dataset',
        'Cited answers — each claim links to its source records',
        'Decision audit: traceable rationale for every recommendation',
        'Respects access tier — never surfaces restricted-vault content',
        'Scenario prompts: “what if trade volume rises in region X”',
        'One-click escalation to MACN analysts',
      ]}
      demoMoment="Ask “Where is corruption risk rising fastest this quarter?” Lodestar answers with the Gulf of Guinea corridor, shows the sanitized evidence it used, and opens the full decision-audit trail behind the recommendation."
    />
  )
}
