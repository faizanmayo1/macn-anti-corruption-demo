import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Database,
  EyeOff,
  FileSearch,
  Globe2,
  Info,
  Layers,
  Lock,
  Radar,
  Ship,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { KPICard } from '@/components/blueprint/KPICard'
import { PageHeader, HeaderStat } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import {
  earlyWarnings,
  heroCorridor,
  incidentFeed,
  incidentTrend,
  lodestarDigest,
  macn,
  ports,
  type Alert,
  type IntakeItem,
  type Port,
  type RiskBand,
} from '@/data/macn'
import type { ChartTooltipProps } from '@/utils/chart'
import { formatNumber } from '@/utils/format'
import { cn } from '@/utils/cn'

const bandStyle: Record<RiskBand, { fill: string; ring: string; label: string }> = {
  high: { fill: '#DC2626', ring: 'ring-signal-risk/30', label: 'High-risk' },
  elevated: { fill: '#CE7519', ring: 'ring-gold/30', label: 'Elevated' },
  watch: { fill: '#3B5178', ring: 'ring-steel-400/30', label: 'Watch' },
  clear: { fill: '#15803D', ring: 'ring-signal-positive/30', label: 'Clear' },
}

const sevStyle: Record<IntakeItem['severity'], string> = {
  critical: 'text-signal-risk bg-signal-risk-soft',
  high: 'text-gold-deep bg-gold-soft',
  medium: 'text-steel-600 bg-steel-100',
  low: 'text-signal-positive bg-signal-positive-soft',
}

const statusStyle: Record<IntakeItem['status'], { cls: string; label: string }> = {
  sanitizing: { cls: 'text-gold-deep bg-gold-soft', label: 'Sanitizing' },
  structured: { cls: 'text-steel-600 bg-steel-100', label: 'Structured' },
  linked: { cls: 'text-azure-deep bg-azure-soft', label: 'Linked → SF' },
}

const alertTone: Record<Alert['tone'], { dot: string; icon: typeof Info; ring: string }> = {
  risk: { dot: 'bg-signal-risk', icon: AlertTriangle, ring: 'border-signal-risk/30' },
  warning: { dot: 'bg-signal-warning', icon: AlertTriangle, ring: 'border-gold/30' },
  info: { dot: 'bg-azure', icon: Info, ring: 'border-azure/30' },
}

function TrendTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-hairline bg-card/95 px-3 py-2 shadow-card-md backdrop-blur">
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey as string} className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-ink">
          <span className="h-2 w-2 rounded-full" style={{ background: p.dataKey === 'structured' ? '#0B2545' : '#1668C4' }} />
          <span className="capitalize text-ink-muted">{p.dataKey}</span>
          <span className="ml-auto font-mono tabular">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

// ── Global risk map ───────────────────────────────────────────────
function RiskMap() {
  const hero = ports.find((p) => p.hero) as Port
  const corridorPath = `M ${ports.find((p) => p.code === 'NGAPP')!.x} ${ports.find((p) => p.code === 'NGAPP')!.y}
    Q 49 41, ${ports.find((p) => p.code === 'TGLFW')!.x} ${ports.find((p) => p.code === 'TGLFW')!.y}
    T ${ports.find((p) => p.code === 'GHTEM')!.x} ${ports.find((p) => p.code === 'GHTEM')!.y}`

  return (
    <div className="relative overflow-hidden rounded-xl border border-hairline bg-card shadow-card-sm">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
        <SectionHead title="Global corruption risk" hint="1,350 ports · 20 corridors" icon={Globe2} />
        <span className="hidden items-center gap-1.5 rounded-full border border-hairline bg-canvas-subtle px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-subtle sm:flex">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-azure" />
          </span>
          live
        </span>
      </div>

      <div className="relative">
        <div className="sea-grid pointer-events-none absolute inset-0" aria-hidden />
        <svg viewBox="0 0 100 72" className="relative block h-[340px] w-full" preserveAspectRatio="xMidYMid meet">
          {/* soft landmass hints */}
          <g fill="#0B2545" opacity="0.05">
            <ellipse cx="24" cy="30" rx="15" ry="11" />
            <ellipse cx="52" cy="30" rx="13" ry="14" />
            <ellipse cx="51" cy="52" rx="9" ry="12" />
            <ellipse cx="76" cy="40" rx="16" ry="13" />
            <ellipse cx="37" cy="58" rx="8" ry="11" />
          </g>
          {/* graticule */}
          <g stroke="#0B2545" strokeWidth="0.12" opacity="0.18">
            {[12, 24, 36, 48, 60].map((y) => <line key={y} x1="0" y1={y} x2="100" y2={y} />)}
            {[20, 40, 60, 80].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="72" />)}
          </g>

          {/* hero corridor arc */}
          <path d={corridorPath} fill="none" stroke="#DC2626" strokeWidth="0.5" strokeOpacity="0.45" strokeDasharray="1.4 1.2" className="animate-dash-flow" />

          {/* ports */}
          {ports.map((p) => {
            const r = 1.1 + (p.risk / 100) * 2.4
            const s = bandStyle[p.band]
            return (
              <g key={p.code}>
                {p.hero && (
                  <>
                    <circle cx={p.x} cy={p.y} r={r + 1} fill="none" stroke="#DC2626" strokeWidth="0.3" className="origin-center animate-sonar-ping" style={{ transformBox: 'fill-box' }} />
                    <circle cx={p.x} cy={p.y} r={r + 1} fill="none" stroke="#DC2626" strokeWidth="0.3" className="origin-center animate-sonar-ping" style={{ transformBox: 'fill-box', animationDelay: '1s' }} />
                  </>
                )}
                <circle cx={p.x} cy={p.y} r={r} fill={s.fill} fillOpacity={0.9} stroke="#F7F9FA" strokeWidth="0.35" />
              </g>
            )
          })}
        </svg>

        {/* hero callout */}
        <div className="pointer-events-none absolute left-[36%] top-[58%] w-[210px] max-w-[60%]">
          <div className="rounded-lg border border-signal-risk/30 bg-card/95 px-3 py-2 shadow-card-md backdrop-blur">
            <p className="flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-signal-risk">
              <Radar className="h-3 w-3" /> {heroCorridor.name}
            </p>
            <p className="mt-1 text-[11.5px] leading-snug text-ink">
              {hero.name} · risk <span className="font-mono font-semibold tabular text-signal-risk">{hero.risk}</span> <span className="font-mono text-signal-risk">▲{hero.trend}</span>
            </p>
            <p className="mt-0.5 font-mono text-[9.5px] text-ink-subtle">{heroCorridor.correlatedReports} reports · {heroCorridor.detectedDaysEarly}d early</p>
          </div>
        </div>
      </div>

      {/* legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-hairline px-5 py-3">
        {(Object.keys(bandStyle) as RiskBand[]).map((b) => (
          <span key={b} className="flex items-center gap-1.5 font-mono text-[10px] text-ink-subtle">
            <span className="h-2 w-2 rounded-full" style={{ background: bandStyle[b].fill }} />
            {bandStyle[b].label}
          </span>
        ))}
        <span className="ml-auto font-mono text-[10px] text-ink-faint">node size = port-risk index</span>
      </div>
    </div>
  )
}

function AlertRow({ a }: { a: Alert }) {
  const t = alertTone[a.tone]
  const Icon = t.icon
  return (
    <div className={cn('rounded-lg border bg-canvas-subtle/40 px-3 py-2.5 transition-colors hover:bg-canvas-subtle', t.ring)}>
      <div className="flex items-start gap-2.5">
        <span className={cn('mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md text-white', t.dot)}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12.5px] font-semibold leading-snug text-ink">{a.title}</p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-ink-muted">{a.detail}</p>
          <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">{a.id} · {a.meta}</p>
        </div>
      </div>
    </div>
  )
}

// The signature raw→sanitized redaction line
function RedactionLine() {
  return (
    <div className="rounded-lg border border-hairline bg-canvas-subtle/50 p-3">
      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-subtle">Raw narrative · INC-08842</p>
      <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink">
        “Master <span className="redaction-bar px-1">M. Okonkwo</span> says inspector{' '}
        <span className="redaction-bar px-1">A. Bello</span> demanded{' '}
        <span className="redaction-bar px-1">USD 4,500</span> to release{' '}
        <span className="redaction-bar px-1">MV Celestine</span> at berth{' '}
        <span className="redaction-bar px-1">12</span>.”
      </p>
      <div className="my-2 flex items-center gap-2">
        <span className="h-px flex-1 bg-hairline" />
        <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-azure-deep"><EyeOff className="h-3 w-3" /> Lodestar sanitized</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>
      <p className="text-[11.5px] leading-relaxed text-ink-muted">
        “Vessel master reports an <span className="font-medium text-ink">inspection-hold cash demand</span> (~USD 4.5K) by a port inspector at <span className="font-medium text-ink">Lagos / West Africa</span>.”
      </p>
    </div>
  )
}

function IntakeRow({ i }: { i: IntakeItem }) {
  const st = statusStyle[i.status]
  return (
    <div className="flex items-center gap-3 px-1 py-2.5">
      <span className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-md', i.status === 'linked' ? 'bg-azure-soft text-azure-deep' : 'bg-canvas-subtle text-ink-muted')}>
        <FileSearch className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-[12.5px] font-medium text-ink">
          <span className="font-mono text-[11px] text-ink-subtle">{i.id}</span>
          <span className="truncate">{i.type}</span>
        </p>
        <p className="truncate font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-faint">{i.source} · {i.port} · {i.ago} ago</p>
      </div>
      <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.05em]', sevStyle[i.severity])}>{i.severity}</span>
      <span className={cn('hidden shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.06em] sm:inline-flex', st.cls, i.status === 'sanitizing' && 'animate-pulse-soft')}>{st.label}</span>
    </div>
  )
}

function PortLeaderboard() {
  const top = [...ports].sort((a, b) => b.risk - a.risk).slice(0, 7)
  const max = top[0].risk
  return (
    <div className="space-y-2">
      {top.map((p, idx) => (
        <div key={p.code} className="flex items-center gap-3">
          <span className="w-4 shrink-0 text-right font-mono text-[10px] text-ink-faint">{idx + 1}</span>
          <div className="w-[120px] shrink-0">
            <p className="truncate text-[12px] font-medium text-ink">{p.name}</p>
            <p className="truncate font-mono text-[9px] uppercase tracking-[0.06em] text-ink-faint">{p.code} · {p.country}</p>
          </div>
          <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-canvas-subtle">
            <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(p.risk / max) * 100}%`, background: bandStyle[p.band].fill }} />
          </div>
          <span className="w-8 shrink-0 text-right font-mono text-[12px] font-semibold tabular text-ink">{p.risk}</span>
          <span className={cn('w-9 shrink-0 text-right font-mono text-[10px] tabular', p.trend > 0 ? 'text-signal-risk' : p.trend < 0 ? 'text-signal-positive' : 'text-ink-faint')}>
            {p.trend > 0 ? `▲${p.trend}` : p.trend < 0 ? `▼${Math.abs(p.trend)}` : '·'}
          </span>
        </div>
      ))}
    </div>
  )
}

export function CommandCenter() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="MACN · Intelligence Command Center"
        title="One secure intelligence layer over every corruption signal."
        description="Structured Salesforce incidents and sensitive qualitative reports — anonymized, correlated and risk-scored by Lodestar — in a single governed view. System of record stays in Salesforce."
        actions={
          <>
            <span className="hidden items-center gap-1.5 rounded-full border border-hairline bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle md:inline-flex">
              <Database className="h-3.5 w-3.5 text-azure-deep" /> Salesforce · synced
            </span>
            <Link to="/anonymize" className="inline-flex items-center gap-2 rounded-full bg-steel px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-white shadow-cta transition-transform hover:-translate-y-0.5">
              <EyeOff className="h-3.5 w-3.5 text-azure-glow" /> Anonymization engine
            </Link>
          </>
        }
        meta={
          <>
            <HeaderStat label="network risk index" value={`${macn.globalRiskIndex}`} tone="warning" />
            <HeaderStat label="high-risk ports" value={`${macn.portsHighRisk}`} tone="risk" />
            <HeaderStat label="auto-sanitized" value={`${macn.autoSanitizedPct}%`} tone="azure" />
            <HeaderStat label="active alerts" value={`${macn.activeAlerts}`} tone="risk" />
          </>
        }
      />

      {/* KPI row */}
      <div className="reveal mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <KPICard label="Incidents" value={formatNumber(macn.totalIncidents)} sub="70K structured · 24K narrative" icon={Layers} />
        <KPICard label="Ports monitored" value={`${macn.ports}`} delta={`${macn.portsHighRisk} high-risk`} deltaTone="negative" icon={Ship} />
        <KPICard label="Active corridors" value={`${macn.corridors}`} sub="trade routes scored" icon={Activity} />
        <KPICard label="High-risk cases" value={formatNumber(macn.highRiskCases)} sub="restricted handling" icon={AlertTriangle} />
        <KPICard label="Auto-sanitized" value={`${macn.autoSanitizedPct}%`} accent delta={`${macn.reportsIngestedToday} today`} deltaTone="neutral" icon={EyeOff} />
        <KPICard label="Member orgs" value={`${macn.members}`} sub="safe shared intel" icon={Globe2} />
      </div>

      {/* Lodestar digest + alerts */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        <div className="relative overflow-hidden rounded-xl border border-azure/30 bg-card shadow-card-sm">
          <div className="azure-rule" aria-hidden />
          <div className="aurora-wash pointer-events-none absolute inset-0 opacity-80" aria-hidden />
          <div className="relative p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-azure text-white shadow-volt-glow"><Sparkles className="h-3.5 w-3.5" /></span>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-azure-deep">Lodestar · daily intelligence digest</p>
              </div>
              <span className="rounded-full border border-azure/30 bg-azure-soft px-2 py-0.5 font-mono text-[9.5px] font-semibold tabular text-azure-deep">{Math.round(lodestarDigest.confidence * 100)}% confidence</span>
            </div>
            <h2 className="mt-3 font-display text-[19px] font-bold leading-snug tracking-tight-bank text-ink">{lodestarDigest.headline}</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{lodestarDigest.body}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {lodestarDigest.basis.map((b) => (
                <span key={b} className="rounded-full border border-hairline bg-canvas-subtle/70 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-subtle">{b}</span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-hairline pt-4">
              <Link to="/patterns" className="inline-flex items-center gap-1.5 rounded-full bg-azure px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-white shadow-cta transition-transform hover:-translate-y-0.5">
                <Radar className="h-3.5 w-3.5" /> Open in Pattern & Risk
              </Link>
              <Link to="/incident" className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-card px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink-muted transition-colors hover:bg-canvas-subtle">
                View INC-08842 <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Early-warning alerts" hint="ahead of formal reporting" icon={AlertTriangle} />
          <div className="mt-4 space-y-2.5">
            {earlyWarnings.map((a) => <AlertRow key={a.id} a={a} />)}
          </div>
        </div>
      </div>

      {/* Map + anonymization */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        <RiskMap />
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Sensitive-data safety" hint="raw → analytics-safe" icon={Lock} />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-hairline bg-canvas-subtle/50 px-3 py-2.5">
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-subtle">In restricted vault</p>
              <p className="mt-1 font-display text-[20px] font-bold tabular text-ink">{formatNumber(macn.vaultRestricted)}</p>
            </div>
            <div className="rounded-lg border border-azure/30 bg-azure-soft/40 px-3 py-2.5">
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-azure-deep">Auto-sanitized</p>
              <p className="mt-1 font-display text-[20px] font-bold tabular text-azure-gradient">{macn.autoSanitizedPct}%</p>
            </div>
          </div>
          <div className="mt-3"><RedactionLine /></div>
          <Link to="/anonymize" className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-azure/30 bg-card px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-azure-deep transition-colors hover:bg-azure-soft">
            Open anonymization engine <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Trend + live intake */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Incident intake" hint="structured vs qualitative · 12 mo" icon={Activity} action={
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-ink-subtle"><span className="h-2 w-2 rounded-sm bg-steel" /> Structured</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-ink-subtle"><span className="h-2 w-2 rounded-sm bg-azure" /> Qualitative</span>
            </div>
          } />
          <div className="mt-4 h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incidentTrend} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="gStruct" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B2545" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#0B2545" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gQual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1668C4" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#1668C4" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="#E2E9EB" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: '#5C7681', fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={{ stroke: '#E2E9EB' }} />
                <YAxis tick={{ fontSize: 10, fill: '#93A7AE', fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} />
                <Tooltip content={<TrendTooltip />} />
                <Area type="monotone" dataKey="structured" stroke="#0B2545" strokeWidth={2} fill="url(#gStruct)" />
                <Area type="monotone" dataKey="qualitative" stroke="#1668C4" strokeWidth={2} fill="url(#gQual)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Live intake" hint="Lodestar structuring · sanitizing" icon={FileSearch} />
          <div className="mt-3 divide-y divide-hairline">
            {incidentFeed.map((i) => <IntakeRow key={i.id} i={i} />)}
          </div>
        </div>
      </div>

      {/* Port leaderboard */}
      <div className="mt-5 rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
        <SectionHead title="Port-risk leaderboard" hint="risk index · 30-day trend" icon={Radar} action={
          <Link to="/patterns" className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.08em] text-azure-deep hover:underline">All ports <ArrowUpRight className="h-3 w-3" /></Link>
        } />
        <div className="mt-4"><PortLeaderboard /></div>
      </div>
    </div>
  )
}
