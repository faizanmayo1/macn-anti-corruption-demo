import {
  LayoutDashboard,
  FileSearch,
  EyeOff,
  Radar,
  Lock,
  GitBranch,
  Globe2,
  Bot,
  type LucideIcon,
} from 'lucide-react'

import { ROUTES } from '@/routes/paths'

export interface RouteEntry {
  path: string
  section: string
  label: string
  short: string
  eyebrow: string
  icon: LucideIcon
  end?: boolean
  badge?: { text: string; variant: 'ai' | 'live' }
}

export const routeRegistry: RouteEntry[] = [
  { path: ROUTES.root, end: true, section: 'Overview', label: 'Intelligence Command Center', short: 'Command Center', eyebrow: '15,000 incidents · 50 ports', icon: LayoutDashboard },

  { path: ROUTES.incident, section: 'Intelligence', label: 'Incident Intelligence View', short: 'Incident Intelligence', eyebrow: 'Salesforce + narrative', icon: FileSearch },
  { path: ROUTES.anonymize, section: 'Intelligence', label: 'Anonymization & Redaction Engine', short: 'Anonymization Engine', eyebrow: 'Sensitive → safe', icon: EyeOff, badge: { text: 'AI', variant: 'ai' } },
  { path: ROUTES.patterns, section: 'Intelligence', label: 'Pattern Detection & Risk Intelligence', short: 'Pattern & Risk', eyebrow: 'Clusters · corridors · scoring', icon: Radar, badge: { text: 'AI', variant: 'ai' } },

  { path: ROUTES.vault, section: 'Governance', label: 'Confidentiality Vault & Access', short: 'Confidentiality Vault', eyebrow: 'Tiered access', icon: Lock, badge: { text: 'Live', variant: 'live' } },
  { path: ROUTES.audit, section: 'Governance', label: 'Audit & Data Lineage', short: 'Audit & Lineage', eyebrow: 'Source → output trail', icon: GitBranch },

  { path: ROUTES.members, section: 'Members', label: 'Member Insight Portal', short: 'Member Portal', eyebrow: 'Safe shared intelligence', icon: Globe2 },

  { path: ROUTES.copilot, section: 'Assistant', label: 'Lodestar Copilot & Decision Audit', short: 'Lodestar Copilot', eyebrow: 'Ask · explain · trace', icon: Bot, badge: { text: 'AI', variant: 'ai' } },
]

const SECTION_ORDER = ['Overview', 'Intelligence', 'Governance', 'Members', 'Assistant']

export function groupRoutesBySection() {
  return SECTION_ORDER.map((section) => ({
    section,
    entries: routeRegistry.filter((r) => r.section === section),
  }))
}

export function findRouteByPath(pathname: string): RouteEntry | undefined {
  if (pathname === '/') return routeRegistry[0]
  return routeRegistry.find((r) => r.path !== '/' && pathname.startsWith(r.path))
}
