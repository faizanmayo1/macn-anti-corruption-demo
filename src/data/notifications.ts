export interface AppNotification {
  id: string
  tone: 'positive' | 'warning' | 'risk' | 'info'
  title: string
  body: string
  time: string
  unread: boolean
}

export const notifications: AppNotification[] = [
  {
    id: 'n1',
    tone: 'risk',
    title: 'Emerging bribery corridor · Gulf of Guinea',
    body: 'Lodestar correlated 23 sanitized reports across Lagos, Lomé and Tema — 19 days before formal reporting.',
    time: '6 min ago',
    unread: true,
  },
  {
    id: 'n2',
    tone: 'warning',
    title: 'Lagos (Apapa) crossed the high-risk threshold',
    body: 'Port-risk index moved 71 → 84 over the last 30 days (+13 pts).',
    time: '40 min ago',
    unread: true,
  },
  {
    id: 'n3',
    tone: 'info',
    title: 'INC-08842 sanitized & linked to Salesforce',
    body: 'Highly-sensitive whistleblower narrative redacted; safe analytics version linked to case SF-44719.',
    time: '1 hr ago',
    unread: true,
  },
  {
    id: 'n4',
    tone: 'info',
    title: 'New corruption typology named',
    body: 'Lodestar clustered repeated reports into “inspection-hold cash demand”.',
    time: '3 hrs ago',
    unread: false,
  },
  {
    id: 'n5',
    tone: 'positive',
    title: 'Q2 member intelligence digest published',
    body: 'Anonymized regional risk trends shared with 30 member organizations — zero sensitive leakage.',
    time: 'Yesterday',
    unread: false,
  },
]
