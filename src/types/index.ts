// Roundstone — Captive Health Benefits Intelligence · shared domain types

// Risk status reuses the green/amber/red ramp (healthy / watch / breach) so the
// shared ScoreRing / StatusChip primitives stay wired unedited.
export type ComplianceStatus = 'green' | 'amber' | 'red'
export type Tone = 'positive' | 'warning' | 'risk' | 'info' | 'neutral'

export type ClaimCategory =
  | 'Oncology'
  | 'Specialty Rx'
  | 'Renal / Dialysis'
  | 'Cardiac'
  | 'NICU / Maternity'
  | 'Musculoskeletal'
  | 'Behavioral'

/** A self-funded employer group inside the Roundstone group medical captive. */
export interface EmployerGroup {
  id: string
  name: string
  industry: string
  state: string
  lives: number // covered lives (employees + dependents)
  joined: number // year entered the captive
  fundingAnnual: number // annualized funding (premium-equivalent)
  lossRatio: number // paid / funded, %
  specDeductible: number // specific stop-loss deductible ($/claimant)
  aggUsedPct: number // % of aggregate attachment consumed YTD
  status: ComplianceStatus
  trendPp: number // loss-ratio change vs prior period (percentage points)
  surplusYtd: number // surplus accrued toward member distribution
  renewalMonth: string
  openItems: number
  specialtyRxShare: number // % of paid claims from specialty pharmacy
  aiFlag?: string
}

/** A high-cost claimant tracked against the specific stop-loss deductible. */
export interface Claimant {
  id: string
  group: string
  category: ClaimCategory
  paidYtd: number
  projectedAnnual: number
  vsSpecPct: number // projected paid as % of the specific deductible
  status: ComplianceStatus
  aiFlagged?: boolean
  note?: string
}

export interface CostDriver {
  label: ClaimCategory | string
  share: number // % of total paid
  trendPp: number // share change vs prior period
  tone: Tone
}

/** An AI-surfaced cost / risk anomaly. */
export interface Anomaly {
  id: string
  title: string
  group: string
  detail: string
  severity: Tone
  deltaPct: number
  confidence: number // 0–100
  window: string
}

export interface SeriesPoint {
  label: string
  funded: number
  paid: number
  projected?: number
}

/** A modeled action in the Renewal & Plan Studio hero flow. */
export interface RenewalAction {
  id: string
  label: string
  detail: string
  savings: number // $ protected / saved this plan year
  lossRatioPp: number // effect on group loss ratio (pp, negative = better)
  effort: 'Low' | 'Moderate' | 'High'
  recommended: boolean
}

export interface MemberSurplus {
  group: string
  contributed: number
  lossRatio: number
  surplusReturn: number
  status: ComplianceStatus
}
