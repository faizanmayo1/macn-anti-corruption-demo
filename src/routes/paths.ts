export const ROUTES = {
  root: '/',
  incident: '/incident',
  anonymize: '/anonymize',
  patterns: '/patterns',
  vault: '/vault',
  audit: '/audit',
  members: '/members',
  copilot: '/copilot',
} as const

export type RouteKey = keyof typeof ROUTES
