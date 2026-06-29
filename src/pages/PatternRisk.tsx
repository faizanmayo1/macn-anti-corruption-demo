import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  GitBranch,
  Info,
  Radar,
  Ship,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { PageHeader, HeaderStat } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import {
  actorRisk,
  clusters,
  corridorDetail,
  emergingThreats,
  forecast,
  reportingThreshold,
  riskLenses,
  routes,
  type Cluster,
  type Threat,
} from '@/data/patterns'
import type { ChartTooltipProps } from '@/utils/chart'
import { cn } from '@/utils/cn'

const clusterStatus: Record<Cluster['status'], string> = {
  Emerging: 'text-signal-risk bg-signal-risk-soft border-signal-risk/30',
  Established: 'text-steel-600 bg-steel-100 border-steel-200',
  Watch: 'text-gold-deep bg-gold-soft border-gold/30',
}

const threatTone: Record<Threat['tone'], { dot: string; icon: typeof Info }> = {
  risk: { dot: 'bg-signal-risk', icon: AlertTriangle },
  warning: { dot: 'bg-signal-warning', icon: TrendingUp },
  info: { dot: 'bg-azure', icon: Info },
}

const riskColor = (s: number) => (s >= 80 ? '#DC2626' : s >= 65 ? '#CE7519' : s >= 50 ? '#2F5763' : '#15803D')

function ForecastTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null
  const v = payload.find((p) => p.value != null)
  return (
    <div className="rounded-lg border border-hairline bg-card/95 px-3 py-2 shadow-card-md backdrop-blur">
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle">{label}</p>
      <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink">
        <span className="h-2 w-2 rounded-full" style={{ background: payload.some((p) => p.dataKey === 'forecast' && p.value != null) && !payload.some((p) => p.dataKey === 'actual' && p.value != null) ? '#CE7519' : '#0FB5A6' }} />
        corridor risk <span className="ml-auto font-mono font-semibold tabular">{v?.value}</span>
      </p>
    </div>
  )
}

// Horizontal corridor spine — Lagos → Lomé → Tema
function CorridorSpine() {
  const nodes = corridorDetail.spine
  const xs = [20, 50, 80]
  return (
    <svg viewBox="0 0 100 34" className="block h-[120px] w-full">
      <path d={`M ${xs[0]} 17 L ${xs[1]} 17 L ${xs[2]} 17`} fill="none" stroke="#DC2626" strokeOpacity="0.4" strokeWidth="0.7" strokeDasharray="1.6 1.2" className="animate-dash-flow" />
      {nodes.map((n, i) => {
        const r = 3 + (n.risk / 100) * 3.5
        return (
          <g key={n.code}>
            {i === 0 && (
              <circle cx={xs[i]} cy="17" r={r + 1.5} fill="none" stroke="#DC2626" strokeWidth="0.4" className="origin-center animate-sonar-ping" style={{ transformBox: 'fill-box' }} />
            )}
            <circle cx={xs[i]} cy="17" r={r} fill="#DC2626" fillOpacity="0.9" stroke="#F7F9FA" strokeWidth="0.5" />
            <text x={xs[i]} y="17.9" textAnchor="middle" className="fill-white font-mono" style={{ fontSize: '3px', fontWeight: 700 }}>{n.risk}</text>
            <text x={xs[i]} y="7.5" textAnchor="middle" className="fill-ink font-sans" style={{ fontSize: '3.4px', fontWeight: 600 }}>{n.name}</text>
            <text x={xs[i]} y="30" textAnchor="middle" className="fill-ink-subtle font-mono" style={{ fontSize: '2.8px' }}>{n.reports} reports</text>
          </g>
        )
      })}
    </svg>
  )
}

function RiskLensCard({ lens }: { lens: (typeof riskLenses)[number] }) {
  return (
    <div className="rounded-xl border border-hairline bg-card p-4 shadow-card-sm">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-subtle">{lens.label}</p>
        <span className={cn('font-mono text-[10px] font-semibold tabular', lens.trend > 0 ? 'text-signal-risk' : 'text-signal-positive')}>{lens.trend > 0 ? `▲${lens.trend}` : `▼${Math.abs(lens.trend)}`}</span>
      </div>
      <p className="mt-1.5 text-[13px] font-semibold text-ink">{lens.subject}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-[26px] font-extrabold leading-none tabular tracking-tight-bank" style={{ color: riskColor(lens.score) }}>{lens.score}</span>
        <span className="font-mono text-[10px] text-ink-faint">{lens.scale}</span>
      </div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
        <div className="h-full rounded-full" style={{ width: `${lens.score}%`, background: riskColor(lens.score) }} />
      </div>
    </div>
  )
}

export function PatternRisk() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Intelligence · Pattern Detection"
        title="From sanitized reports to systemic patterns — before they surface."
        description="Lodestar clusters the safe analytics layer by typology, actor, port and vessel, scores port / route / actor risk, and forecasts where corruption is escalating — surfacing corridors weeks ahead of formal reporting."
        actions={
          <Link to="/audit" className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink-muted transition-colors hover:bg-canvas-subtle">
            <GitBranch className="h-3.5 w-3.5" /> Trace lineage
          </Link>
        }
        meta={
          <>
            <HeaderStat label="corridors monitored" value="20" />
            <HeaderStat label="active clusters" value={`${clusters.length}`} tone="azure" />
            <HeaderStat label="emerging" value="2" tone="risk" />
            <HeaderStat label="detection lead" value={`${corridorDetail.leadDays}d`} tone="azure" />
          </>
        }
      />

      {/* Emerging corridor hero + risk lenses */}
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        <div className="relative overflow-hidden rounded-xl border border-signal-risk/30 bg-card shadow-card-sm">
          <div className="gold-rule" aria-hidden />
          <div className="relative p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-signal-risk text-white"><Radar className="h-3.5 w-3.5" /></span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-signal-risk">Emerging corridor detected</p>
                  <p className="font-display text-[17px] font-bold tracking-tight-bank text-ink">{corridorDetail.name}</p>
                </div>
              </div>
              <span className="rounded-full border border-signal-risk/30 bg-signal-risk-soft px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.06em] text-signal-risk">{corridorDetail.severity}</span>
            </div>

            <div className="mt-2 rounded-lg border border-hairline bg-canvas-subtle/40 px-3 pb-1 pt-2">
              <CorridorSpine />
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-lg border border-azure/30 bg-azure-soft/50 px-3 py-2">
              <Sparkles className="h-4 w-4 shrink-0 text-azure-deep" />
              <p className="text-[12.5px] leading-snug text-ink">
                Shared typology <span className="font-semibold">“{corridorDetail.typology}”</span> repeating across 3 ports — flagged <span className="font-semibold text-azure-deep">{corridorDetail.leadDays} days</span> before it would reach formal reporting.
              </p>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2.5">
              {[
                { k: 'Correlated reports', v: corridorDetail.correlatedReports },
                { k: 'Structured cases', v: corridorDetail.structuredCases },
                { k: 'Route-risk index', v: corridorDetail.riskIndex },
                { k: 'Confidence', v: `${Math.round(corridorDetail.confidence * 100)}%` },
              ].map((s) => (
                <div key={s.k} className="rounded-lg border border-hairline bg-card px-3 py-2 text-center">
                  <p className="font-display text-[18px] font-bold tabular text-ink">{s.v}</p>
                  <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-ink-faint">{s.k}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-hairline pt-4">
              <Link to="/audit" className="inline-flex items-center gap-1.5 rounded-full bg-signal-risk px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-white shadow-card-sm transition-transform hover:-translate-y-0.5">
                Raise & route alert
              </Link>
              <Link to="/incident" className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-card px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink-muted transition-colors hover:bg-canvas-subtle">
                Underlying incidents <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {riskLenses.map((l) => <RiskLensCard key={l.key} lens={l} />)}
        </div>
      </div>

      {/* Forecast + clusters */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Predictive corridor-risk forecast" hint="observed → projected" icon={TrendingUp} action={
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-ink-subtle"><span className="h-2 w-2 rounded-sm bg-azure" /> Observed</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-ink-subtle"><span className="h-2 w-2 rounded-sm bg-gold" /> Forecast</span>
            </div>
          } />
          <div className="mt-4 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecast} margin={{ top: 8, right: 10, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="gActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0FB5A6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#0FB5A6" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#CE7519" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#CE7519" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="#E2E9EB" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: '#5C7681', fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={{ stroke: '#E2E9EB' }} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 10, fill: '#93A7AE', fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} />
                <Tooltip content={<ForecastTooltip />} />
                <ReferenceLine y={reportingThreshold} stroke="#DC2626" strokeDasharray="4 3" strokeOpacity={0.6} label={{ value: 'Formal-reporting threshold', position: 'insideTopRight', fontSize: 9, fill: '#DC2626', fontFamily: 'JetBrains Mono' }} />
                <ReferenceLine x="Jun" stroke="#0A7E73" strokeDasharray="3 3" label={{ value: 'Detected · 19d early', position: 'insideBottomLeft', fontSize: 9, fill: '#0A7E73', fontFamily: 'JetBrains Mono' }} />
                <Area type="monotone" dataKey="actual" stroke="#0FB5A6" strokeWidth={2.4} fill="url(#gActual)" isAnimationActive={false} connectNulls />
                <Area type="monotone" dataKey="forecast" stroke="#CE7519" strokeWidth={2.2} strokeDasharray="5 3" fill="url(#gForecast)" isAnimationActive={false} connectNulls />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Detected clusters" hint="Lodestar grouping" icon={Boxes} />
          <div className="mt-3 space-y-2">
            {clusters.map((c) => (
              <div key={c.id} className={cn('rounded-lg border bg-canvas-subtle/40 px-3 py-2.5 transition-colors hover:bg-canvas-subtle', c.hero ? 'border-signal-risk/30' : 'border-hairline')}>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[12.5px] font-semibold text-ink">{c.label}</p>
                  <span className={cn('shrink-0 rounded-full border px-2 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.05em]', clusterStatus[c.status])}>{c.status}</span>
                </div>
                <div className="mt-1 flex items-center justify-between font-mono text-[9.5px] text-ink-faint">
                  <span className="truncate">{c.method} · {c.ports}</span>
                  <span className="shrink-0 text-ink-subtle">{c.size} · {Math.round(c.confidence * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Route risk + actor risk */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Corridor / route-risk" hint="top trade routes" icon={Ship} action={
            <Link to="/" className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.08em] text-azure-deep hover:underline">Map view <ArrowUpRight className="h-3 w-3" /></Link>
          } />
          <div className="mt-3 overflow-hidden rounded-lg border border-hairline">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-hairline bg-canvas-subtle/60 font-mono text-[9px] uppercase tracking-[0.08em] text-ink-subtle">
                  <th className="px-3 py-2 font-medium">Corridor</th>
                  <th className="hidden px-3 py-2 font-medium sm:table-cell">Legs</th>
                  <th className="px-3 py-2 text-right font-medium">Reports</th>
                  <th className="px-3 py-2 text-right font-medium">Risk</th>
                  <th className="px-3 py-2 text-right font-medium">30d</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((r) => (
                  <tr key={r.id} className="border-b border-hairline/70 last:border-0">
                    <td className="px-3 py-2.5"><p className="text-[12.5px] font-medium text-ink">{r.name}</p><p className="font-mono text-[9px] uppercase tracking-[0.05em] text-ink-faint">{r.id}</p></td>
                    <td className="hidden px-3 py-2.5 text-[11.5px] text-ink-muted sm:table-cell">{r.legs}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-[12px] tabular text-ink-muted">{r.reports}</td>
                    <td className="px-3 py-2.5 text-right"><span className="font-mono text-[13px] font-semibold tabular" style={{ color: riskColor(r.risk) }}>{r.risk}</span></td>
                    <td className={cn('px-3 py-2.5 text-right font-mono text-[11px] tabular', r.trend > 0 ? 'text-signal-risk' : r.trend < 0 ? 'text-signal-positive' : 'text-ink-faint')}>{r.trend > 0 ? `▲${r.trend}` : r.trend < 0 ? `▼${Math.abs(r.trend)}` : '·'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Actor-type risk" hint="who is driving incidents" icon={Users} />
          <div className="mt-4 space-y-3">
            {actorRisk.map((a) => (
              <div key={a.type} className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-medium text-ink">{a.type}</p>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                    <div className="h-full rounded-full" style={{ width: `${a.score}%`, background: riskColor(a.score) }} />
                  </div>
                </div>
                <span className="w-8 shrink-0 text-right font-mono text-[13px] font-semibold tabular text-ink">{a.score}</span>
                <span className="hidden w-16 shrink-0 text-right font-mono text-[10px] tabular text-ink-faint sm:inline">{a.incidents} inc</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emerging threats */}
      <div className="mt-5 rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
        <SectionHead title="Emerging-threat signals" hint="spikes · new typologies · repeat actors" icon={Activity} />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {emergingThreats.map((t) => {
            const tn = threatTone[t.tone]
            const Icon = tn.icon
            return (
              <div key={t.id} className="rounded-lg border border-hairline bg-canvas-subtle/40 p-3.5">
                <div className="flex items-center gap-2">
                  <span className={cn('grid h-6 w-6 place-items-center rounded-md text-white', tn.dot)}><Icon className="h-3.5 w-3.5" /></span>
                  <p className="text-[12.5px] font-semibold text-ink">{t.title}</p>
                </div>
                <p className="mt-2 text-[11.5px] leading-snug text-ink-muted">{t.detail}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
