import { Navigate, type RouteObject } from 'react-router-dom'

import { AppShell } from '@/layouts/AppShell'
import { CommandCenter } from '@/pages/CommandCenter'
import { IncidentIntelligence } from '@/pages/IncidentIntelligence'
import { AnonymizationEngine } from '@/pages/AnonymizationEngine'
import { PatternRisk } from '@/pages/PatternRisk'
import { ConfidentialityVault } from '@/pages/ConfidentialityVault'
import { AuditLineage } from '@/pages/AuditLineage'
import { MemberPortal } from '@/pages/MemberPortal'
import { LodestarCopilot } from '@/pages/LodestarCopilot'
import { ROUTES } from '@/routes/paths'

export const routes: RouteObject[] = [
  {
    path: ROUTES.root,
    element: <AppShell />,
    children: [
      { index: true, element: <CommandCenter /> },
      { path: ROUTES.incident.slice(1), element: <IncidentIntelligence /> },
      { path: ROUTES.anonymize.slice(1), element: <AnonymizationEngine /> },
      { path: ROUTES.patterns.slice(1), element: <PatternRisk /> },
      { path: ROUTES.vault.slice(1), element: <ConfidentialityVault /> },
      { path: ROUTES.audit.slice(1), element: <AuditLineage /> },
      { path: ROUTES.members.slice(1), element: <MemberPortal /> },
      { path: ROUTES.copilot.slice(1), element: <LodestarCopilot /> },
      { path: '*', element: <Navigate to={ROUTES.root} replace /> },
    ],
  },
]
