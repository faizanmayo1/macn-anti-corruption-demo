import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Download,
  EyeOff,
  FileCheck2,
  Fingerprint,
  GitBranch,
  Lock,
  Radar,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import { PageHeader, HeaderStat } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import {
  auditEvents,
  exportPackage,
  lineage,
  type AuditCategory,
  type LineageNode,
  type StageKind,
} from '@/data/lineage'
import { cn } from '@/utils/cn'

const kindMeta: Record<StageKind, { icon: typeof Database; dot: string; chip: string }> = {
  source: { icon: Database, dot: 'bg-steel-500', chip: 'text-steel-600 bg-steel-100 border-steel-200' },
  transform: { icon: GitBranch, dot: 'bg-steel-600', chip: 'text-steel-600 bg-steel-100 border-steel-200' },
  anonymize: { icon: EyeOff, dot: 'bg-azure', chip: 'text-azure-deep bg-azure-soft border-azure/30' },
  ai: { icon: Sparkles, dot: 'bg-azure', chip: 'text-azure-deep bg-azure-soft border-azure/30' },
  insight: { icon: Radar, dot: 'bg-signal-risk', chip: 'text-signal-risk bg-signal-risk-soft border-signal-risk/30' },
}

const catStyle: Record<AuditCategory, string> = {
  Ingestion: 'text-steel-600 bg-steel-100',
  Anonymization: 'text-azure-deep bg-azure-soft',
  Transform: 'text-steel-600 bg-steel-100',
  Access: 'text-gold-deep bg-gold-soft',
  Report: 'text-signal-positive bg-signal-positive-soft',
}

function NodeDetail({ node }: { node: LineageNode }) {
  const m = kindMeta[node.kind]
  const Icon = m.icon
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2.5">
        <span className={cn('grid h-9 w-9 place-items-center rounded-lg text-white', node.kind === 'insight' ? 'bg-signal-risk' : node.kind === 'source' || node.kind === 'transform' ? 'bg-steel' : 'bg-azure')}>
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-subtle">{node.stage}</p>
          <p className="font-display text-[15px] font-bold tracking-tight-bank text-ink">{node.title}</p>
        </div>
      </div>
      <p className="mt-3 text-[12.5px] leading-relaxed text-ink-muted">{node.detail}</p>
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2 rounded-lg border border-hairline bg-canvas-subtle/40 px-3 py-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-faint">In</span>
          <span className="flex-1 text-[12px] text-ink">{node.inputs}</span>
        </div>
        <div className="flex items-center justify-center"><ArrowRight className="h-3.5 w-3.5 rotate-90 text-ink-faint" /></div>
        <div className="flex items-center gap-2 rounded-lg border border-azure/30 bg-azure-soft/40 px-3 py-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-azure-deep">Out</span>
          <span className="flex-1 text-[12px] font-medium text-ink">{node.output}</span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-hairline pt-3">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-faint">Actor</p>
          <p className="mt-0.5 text-[11.5px] font-medium text-ink">{node.actor}</p>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-faint">Timestamp</p>
          <p className="mt-0.5 font-mono text-[11.5px] text-ink">{node.time}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg border border-hairline bg-canvas-subtle/40 px-3 py-2">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted"><Fingerprint className="h-3.5 w-3.5 text-azure-deep" /> {node.hash}</span>
        <span className="flex items-center gap-1 font-mono text-[9px] font-semibold uppercase tracking-[0.06em] text-signal-positive"><Lock className="h-3 w-3" /> Immutable</span>
      </div>
    </div>
  )
}

export function AuditLineage() {
  const [selected, setSelected] = useState<string>('n6')
  const node = lineage.find((n) => n.id === selected)!

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Governance · Auditability"
        title="Every insight traces back to its source."
        description="Click any stage to unfold the lineage behind the Gulf of Guinea corridor alert — original sources, normalization, anonymization, AI correlation and scoring — each step content-hashed, immutable and exportable as a compliance package."
        actions={
          <button type="button" className="inline-flex items-center gap-2 rounded-full bg-steel px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-white shadow-cta transition-transform hover:-translate-y-0.5">
            <Download className="h-3.5 w-3.5 text-azure-glow" /> Export compliance package
          </button>
        }
        meta={
          <>
            <HeaderStat label="lineage stages" value={`${lineage.length}`} />
            <HeaderStat label="audit events" value={`${auditEvents.length}`} tone="azure" />
            <HeaderStat label="integrity" value="sealed" tone="positive" />
            <HeaderStat label="records" value="immutable" tone="azure" />
          </>
        }
      />

      {/* Traced insight context */}
      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-signal-risk/25 bg-card p-4 shadow-card-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-signal-risk text-white"><Radar className="h-4 w-4" /></span>
          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-signal-risk">Tracing insight · EW-2207</p>
            <p className="font-display text-[15px] font-bold tracking-tight-bank text-ink">Gulf of Guinea corridor alert</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle"><CheckCircle2 className="h-3.5 w-3.5 text-signal-positive" /> Fully traceable</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle"><ShieldCheck className="h-3.5 w-3.5 text-azure-deep" /> 92% confidence</span>
        </div>
      </div>

      {/* Lineage explorer */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Data lineage" hint="source → output · click a stage" icon={GitBranch} />
          <div className="mt-4">
            {lineage.map((n, i) => {
              const m = kindMeta[n.kind]
              const Icon = m.icon
              const on = n.id === selected
              const last = i === lineage.length - 1
              return (
                <div key={n.id} className="relative flex gap-3">
                  {/* spine */}
                  <div className="flex flex-col items-center">
                    <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 transition-colors', on ? 'border-azure bg-azure text-white' : 'border-hairline bg-card text-ink-muted')}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {!last && <span className="my-1 w-0.5 flex-1 bg-gradient-to-b from-hairline-strong to-hairline" />}
                  </div>
                  {/* card */}
                  <button
                    type="button"
                    onClick={() => setSelected(n.id)}
                    className={cn('mb-2.5 flex-1 rounded-lg border px-3.5 py-2.5 text-left transition-all', on ? 'border-azure/50 bg-azure-soft/40 shadow-volt-glow' : 'border-hairline bg-card hover:bg-canvas-subtle')}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-ink-faint">{n.stage}</span>
                        <span className={cn('rounded-full border px-1.5 py-px font-mono text-[8px] font-semibold uppercase tracking-[0.04em]', m.chip)}>{n.kind}</span>
                      </div>
                      <span className="font-mono text-[9.5px] text-ink-faint">{n.hash}</span>
                    </div>
                    <p className="mt-1 text-[13px] font-semibold text-ink">{n.title}</p>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-ink-muted">{n.summary}</p>
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl border border-azure/30 bg-card p-5 shadow-card-sm lg:sticky lg:top-20 lg:self-start">
          <div className="azure-rule" aria-hidden />
          <SectionHead title="Stage detail" hint="provenance & integrity" icon={FileCheck2} />
          <div className="mt-4"><NodeDetail node={node} /></div>
        </div>
      </div>

      {/* Audit log + export */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Immutable audit log" hint="ingestion · anonymization · access · report" icon={Lock} />
          <div className="mt-3 overflow-hidden rounded-lg border border-hairline">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-hairline bg-canvas-subtle/60 font-mono text-[9px] uppercase tracking-[0.07em] text-ink-subtle">
                  <th className="px-3 py-2 font-medium">Event</th>
                  <th className="hidden px-3 py-2 font-medium md:table-cell">Actor</th>
                  <th className="px-3 py-2 font-medium">Time</th>
                  <th className="px-3 py-2 text-right font-medium">Hash</th>
                </tr>
              </thead>
              <tbody>
                {auditEvents.map((e) => (
                  <tr key={e.id} className="border-b border-hairline/70 last:border-0">
                    <td className="px-3 py-2.5">
                      <span className={cn('mr-2 inline-block rounded-full px-1.5 py-px font-mono text-[8.5px] font-semibold uppercase tracking-[0.04em]', catStyle[e.category])}>{e.category}</span>
                      <span className="text-[11.5px] text-ink">{e.detail}</span>
                    </td>
                    <td className="hidden px-3 py-2.5 text-[11.5px] text-ink-muted md:table-cell">{e.actor}</td>
                    <td className="px-3 py-2.5 font-mono text-[10px] text-ink-faint">{e.time}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-[10px] text-ink-faint">{e.hash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-steel-200 bg-card p-5 shadow-card-sm">
          <SectionHead title="Compliance export" hint="audit-ready package" icon={FileCheck2} />
          <div className="mt-4 rounded-lg border border-hairline bg-canvas-subtle/40 p-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-steel text-azure-glow"><FileCheck2 className="h-4 w-4" /></span>
              <div>
                <p className="text-[13px] font-bold text-ink">{exportPackage.name}</p>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-faint">{exportPackage.size} · {exportPackage.formats.join(' + ')}</p>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5">
              {exportPackage.contents.map((c) => (
                <li key={c} className="flex items-center gap-2 text-[12px] text-ink-muted">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-signal-positive" /> {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-azure/30 bg-azure-soft/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.06em] text-azure-deep">
            <Fingerprint className="h-3.5 w-3.5" /> {exportPackage.integrity}
          </div>
          <button type="button" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-azure px-3.5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-white shadow-cta transition-transform hover:-translate-y-0.5">
            <Download className="h-3.5 w-3.5" /> Generate package
          </button>
        </div>
      </div>
    </div>
  )
}
