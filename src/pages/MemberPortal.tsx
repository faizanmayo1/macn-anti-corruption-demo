import {
  Anchor,
  ArrowUpRight,
  Building2,
  Download,
  FileText,
  Globe2,
  Lightbulb,
  Lock,
  Map,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { KPICard } from '@/components/blueprint/KPICard'
import { PageHeader, HeaderStat } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import {
  member,
  memberKpis,
  memberReports,
  memberTrend,
  mitigations,
  regionRisk,
  sharingRules,
  yourPorts,
  type Band,
} from '@/data/member'
import type { ChartTooltipProps } from '@/utils/chart'
import { cn } from '@/utils/cn'

const bandColor: Record<Band, string> = { high: '#DC2626', elevated: '#CE7519', watch: '#3B5178', clear: '#15803D' }
const bandLabel: Record<Band, string> = { high: 'High-risk', elevated: 'Elevated', watch: 'Watch', clear: 'Clear' }

const riskColor = (s: number) => (s >= 80 ? '#DC2626' : s >= 65 ? '#CE7519' : s >= 50 ? '#3B5178' : '#15803D')

function TrendTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-hairline bg-card/95 px-3 py-2 shadow-card-md backdrop-blur">
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle">{label}</p>
      <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink"><span className="h-2 w-2 rounded-full bg-azure" /> {payload[0].value} incidents</p>
    </div>
  )
}

export function MemberPortal() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Members · Safe Intelligence Sharing"
        title="Your routes, your risk — safely shared."
        description="Qualitative insight delivered through your existing member API channel — simple enough to act on at the port call. Drawn only from the sanitized analytics layer: high-risk ports on your routes, anonymized regional trends and clear mitigations for masters. No incident-level detail, no identities — ever."
        actions={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-signal-positive/30 bg-signal-positive-soft px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-signal-positive">
            <ShieldCheck className="h-3.5 w-3.5" /> No sensitive leakage
          </span>
        }
        meta={
          <>
            <HeaderStat label="ports monitored" value="17" />
            <HeaderStat label="flagged high-risk" value="4" tone="risk" />
            <HeaderStat label="regions" value="2" tone="azure" />
          </>
        }
      />

      {/* Member context banner */}
      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-hairline bg-card p-4 shadow-card-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-steel text-azure-glow"><Building2 className="h-5 w-5" /></span>
          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-subtle">Viewing as member</p>
            <p className="font-display text-[16px] font-bold tracking-tight-bank text-ink">{member.name}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle"><Anchor className="h-3.5 w-3.5 text-ink-muted" /> {member.fleet}</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle"><Map className="h-3.5 w-3.5 text-ink-muted" /> {member.routes}</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle">{member.regions}</span>
        </div>
      </div>

      {/* KPI row */}
      <div className="reveal mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {memberKpis.map((k) => (
          <KPICard key={k.label} label={k.label} value={k.value} sub={k.sub} accent={k.tone === 'azure'} />
        ))}
      </div>

      {/* Your ports + regional risk */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="High-risk ports on your routes" hint="port-level indicators · with advisory" icon={Anchor} />
          <div className="mt-4 space-y-2.5">
            {yourPorts.map((p) => (
              <div key={p.code} className="flex items-start gap-3 rounded-lg border border-hairline bg-canvas-subtle/40 px-3.5 py-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg" style={{ background: `${bandColor[p.band]}1a` }}>
                  <span className="font-display text-[13px] font-bold tabular" style={{ color: bandColor[p.band] }}>{p.risk}</span>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-semibold text-ink">{p.name} <span className="font-mono text-[10px] font-normal uppercase tracking-[0.05em] text-ink-faint">{p.code} · {p.country}</span></p>
                    <span className="flex items-center gap-2">
                      <span className="rounded-full px-2 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.05em]" style={{ color: bandColor[p.band], background: `${bandColor[p.band]}1a` }}>{bandLabel[p.band]}</span>
                      <span className={cn('font-mono text-[10px] tabular', p.trend > 0 ? 'text-signal-risk' : p.trend < 0 ? 'text-signal-positive' : 'text-ink-faint')}>{p.trend > 0 ? `▲${p.trend}` : p.trend < 0 ? `▼${Math.abs(p.trend)}` : '·'}</span>
                    </span>
                  </div>
                  <p className="mt-1 text-[11.5px] leading-snug text-ink-muted">{p.advisory}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Regional risk" hint="anonymized aggregate" icon={Globe2} />
          <div className="mt-4 space-y-3">
            {regionRisk.map((r) => (
              <div key={r.region} className="flex items-center gap-3">
                <span className="w-24 shrink-0 truncate text-[12px] font-medium text-ink">{r.region}</span>
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-canvas-subtle">
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${r.risk}%`, background: riskColor(r.risk) }} />
                </div>
                <span className="w-7 shrink-0 text-right font-mono text-[12px] font-semibold tabular text-ink">{r.risk}</span>
                <span className={cn('w-8 shrink-0 text-right font-mono text-[10px] tabular', r.trend > 0 ? 'text-signal-risk' : r.trend < 0 ? 'text-signal-positive' : 'text-ink-faint')}>{r.trend > 0 ? `▲${r.trend}` : r.trend < 0 ? `▼${Math.abs(r.trend)}` : '·'}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memberTrend} margin={{ top: 6, right: 4, bottom: 0, left: -22 }}>
                <defs>
                  <linearGradient id="gMember" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1668C4" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#1668C4" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="#E2E9EB" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 9, fill: '#93A7AE', fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={{ stroke: '#E2E9EB' }} />
                <YAxis tick={{ fontSize: 9, fill: '#93A7AE', fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} />
                <Tooltip content={<TrendTooltip />} />
                <Area type="monotone" dataKey="incidents" stroke="#1668C4" strokeWidth={2} fill="url(#gMember)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 text-center font-mono text-[9px] uppercase tracking-[0.08em] text-ink-faint">Anonymized incidents · your regions · 6 mo</p>
        </div>
      </div>

      {/* Mitigations */}
      <div className="mt-5 rounded-xl border border-azure/30 bg-card p-5 shadow-card-sm">
        <SectionHead title="Recommended mitigations" hint="Lodestar · for your operations" icon={Lightbulb} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {mitigations.map((m) => (
            <div key={m.id} className="flex items-start gap-3 rounded-lg border border-hairline bg-canvas-subtle/40 p-3.5">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-azure text-white shadow-volt-glow"><Lightbulb className="h-4 w-4" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold text-ink">{m.title}</p>
                  <span className="shrink-0 rounded-full bg-azure-soft px-2 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.04em] text-azure-deep">{m.impact}</span>
                </div>
                <p className="mt-1 text-[11.5px] leading-snug text-ink-muted">{m.detail}</p>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.06em] text-ink-faint">{m.port}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reports + sharing rules */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Exportable reports" hint="compliance & risk · for your board" icon={FileText} />
          <div className="mt-4 space-y-2.5">
            {memberReports.map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-lg border border-hairline bg-canvas-subtle/40 px-3.5 py-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-steel text-azure-glow"><FileText className="h-4 w-4" /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink">{r.name}</p>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink-faint">{r.desc} · {r.format}</p>
                </div>
                <button type="button" className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hairline bg-card px-3 py-1.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.08em] text-ink-muted transition-colors hover:bg-canvas-subtle">
                  <Download className="h-3 w-3" /> Export
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Data-sharing rules" hint="what you can & can't see" icon={Lock} />
          <div className="mt-4 space-y-2.5">
            {sharingRules.map((s) => (
              <div key={s.rule} className="flex items-center gap-3 rounded-lg border border-hairline bg-canvas-subtle/40 px-3.5 py-2.5">
                <span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-md text-white', s.tone === 'on' ? 'bg-signal-positive' : 'bg-steel-500')}>
                  {s.tone === 'on' ? <ShieldCheck className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-medium text-ink">{s.rule}</p>
                  <p className={cn('font-mono text-[9.5px] uppercase tracking-[0.06em]', s.tone === 'on' ? 'text-signal-positive' : 'text-ink-faint')}>{s.state}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/vault" className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-azure-deep hover:underline">
            <TrendingUp className="h-3.5 w-3.5" /> How tiered access works <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
