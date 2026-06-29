import { Globe2 } from 'lucide-react'

import { ScreenScaffold } from '@/components/blueprint/ScreenScaffold'

export function MemberPortal() {
  return (
    <ScreenScaffold
      eyebrow="Members · Safe Intelligence Sharing"
      title="Member Insight Portal"
      description="Delivers MACN’s value to members through safe, structured intelligence — regional risk maps, anonymized trends and exportable reports, with zero sensitive leakage and per-member sharing rules."
      icon={Globe2}
      features={[
        'Member dashboard: regional risk maps, incident summaries, trend reports',
        'Aggregated intelligence views — no sensitive leakage',
        'Exportable compliance and risk reports',
        'Port-level corruption risk indicators',
        'Member-specific filtering by geography and operations',
        'Secure data-sharing rules per member organization',
      ]}
      demoMoment="A member logs in and sees the high-risk ports on their own routes, anonymized incident trends for their regions, and Lodestar’s recommended mitigation insights — all drawn from the sanitized analytics layer only."
    />
  )
}
