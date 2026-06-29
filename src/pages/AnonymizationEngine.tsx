import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  Layers,
  ListChecks,
  Lock,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import { PageHeader } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import {
  classification,
  entities,
  entityOrder,
  narrative,
  outputs,
  preservedSignal,
  privacyRules,
  source,
  tiers,
  type EntityAction,
  type SensitivityTier,
} from '@/data/anonymize'
import { cn } from '@/utils/cn'

type Stage = 'idle' | 'classify' | 'redact' | 'done'
const ORDER: Stage[] = ['idle', 'classify', 'redact', 'done']
const reached = (stage: Stage, target: Stage) => ORDER.indexOf(stage) >= ORDER.indexOf(target)

const tierStyle: Record<SensitivityTier, { chip: string; dot: string; label: string }> = {
  highly: { chip: 'text-signal-risk bg-signal-risk-soft border-signal-risk/30', dot: 'bg-signal-risk', label: 'Highly sensitive' },
  sensitive: { chip: 'text-gold-deep bg-gold-soft border-gold/30', dot: 'bg-gold', label: 'Sensitive' },
  internal: { chip: 'text-steel-600 bg-steel-100 border-steel-200', dot: 'bg-steel-500', label: 'Internal' },
}

const actionStyle: Record<EntityAction, string> = {
  Redacted: 'text-signal-risk bg-signal-risk-soft',
  Abstracted: 'text-azure-deep bg-azure-soft',
  Generalized: 'text-steel-600 bg-steel-100',
}

// Inline entity token — raw (highlighted, identifiable) vs safe (redacted/abstracted)
function EntityChip({ id, mode }: { id: string; mode: 'raw' | 'safe' }) {
  const e = entities[id]
  if (mode === 'raw') {
    const t = tierStyle[e.tier]
    return (
      <span className={cn('mx-0.5 inline-flex items-center gap-1 rounded border px-1.5 py-px align-baseline font-medium', t.chip)}>
        <span className={cn('h-1.5 w-1.5 rounded-full', t.dot)} />
        {e.raw}
      </span>
    )
  }
  if (e.action === 'Redacted') {
    return (
      <span className="redaction-bar mx-0.5 inline-flex items-center rounded px-1.5 py-px align-baseline font-mono text-[11px] font-medium !text-canvas">
        {e.replacement}
      </span>
    )
  }
  return (
    <span className={cn('mx-0.5 inline-flex items-center rounded px-1.5 py-px align-baseline font-medium', e.action === 'Abstracted' ? 'text-azure-deep bg-azure-soft' : 'text-steel-700 bg-steel-100')}>
      {e.replacement}
    </span>
  )
}

function Narrative({ mode }: { mode: 'raw' | 'safe' }) {
  return (
    <p className="text-[13.5px] leading-[2] text-ink">
      {narrative.map((tok, i) =>
        tok.t === 'text' ? <span key={i}>{tok.v}</span> : <EntityChip key={i} id={tok.id} mode={mode} />,
      )}
    </p>
  )
}

const STEPS = [
  { key: 'idle', label: 'Ingest', icon: FileText, target: 'idle' as Stage },
  { key: 'classify', label: 'Classify', icon: ShieldCheck, target: 'classify' as Stage },
  { key: 'redact', label: 'Redact & abstract', icon: EyeOff, target: 'redact' as Stage },
  { key: 'done', label: 'Dual output', icon: Database, target: 'done' as Stage },
]

function Pipeline({ stage }: { stage: Stage }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto">
      {STEPS.map((s, i) => {
        const active = reached(stage, s.target)
        const current = stage === s.key
        return (
          <div key={s.key} className="flex items-center gap-1.5">
            <div className={cn('flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors', active ? 'border-azure/40 bg-azure-soft' : 'border-hairline bg-card')}>
              <span className={cn('grid h-5 w-5 place-items-center rounded-full', active ? 'bg-azure text-white' : 'bg-canvas-subtle text-ink-faint', current && stage !== 'done' && 'animate-pulse-soft')}>
                <s.icon className="h-3 w-3" />
              </span>
              <span className={cn('whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.08em]', active ? 'text-azure-deep' : 'text-ink-faint')}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <ArrowRight className={cn('h-3.5 w-3.5 shrink-0', active ? 'text-azure' : 'text-hairline-strong')} />}
          </div>
        )
      })}
    </div>
  )
}

export function AnonymizationEngine() {
  const [stage, setStage] = useState<Stage>('idle')
  const timers = useRef<number[]>([])

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  const run = useCallback(() => {
    clearTimers()
    setStage('idle')
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setStage('done')
      return
    }
    timers.current.push(window.setTimeout(() => setStage('classify'), 650))
    timers.current.push(window.setTimeout(() => setStage('redact'), 1700))
    timers.current.push(window.setTimeout(() => setStage('done'), 3100))
  }, [])

  useEffect(() => {
    run()
    return clearTimers
  }, [run])

  const counts = {
    redacted: entityOrder.filter((id) => entities[id].action === 'Redacted').length,
    abstracted: entityOrder.filter((id) => entities[id].action === 'Abstracted').length,
    generalized: entityOrder.filter((id) => entities[id].action === 'Generalized').length,
  }
  const showSafe = reached(stage, 'redact')
  const showClass = reached(stage, 'classify')
  const done = stage === 'done'

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Intelligence · Sensitive-Data Safety"
        title="Sensitive in. Safe out. Nothing analytical lost."
        description="Lodestar ingests a raw qualitative report, classifies its sensitivity, removes every direct identifier and abstracts locations — then emits an analytics-safe record alongside an encrypted vault copy, with a full log of what changed and why."
        actions={
          <>
            <span className="hidden items-center gap-1.5 rounded-full border border-hairline bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle md:inline-flex">
              <FileText className="h-3.5 w-3.5 text-ink-muted" /> {source.incidentId}
            </span>
            <button
              type="button"
              onClick={run}
              className="inline-flex items-center gap-2 rounded-full bg-azure px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-white shadow-cta transition-transform hover:-translate-y-0.5"
            >
              {done ? <RotateCcw className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
              {done ? 'Replay' : 'Anonymizing…'}
            </button>
          </>
        }
      />

      {/* Pipeline + source meta */}
      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-hairline bg-card p-4 shadow-card-sm lg:flex-row lg:items-center lg:justify-between">
        <Pipeline stage={stage} />
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle"><Database className="h-3.5 w-3.5 text-azure-deep" /> {source.channel}</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle">{source.port}</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle">→ Salesforce {source.salesforceCase}</span>
        </div>
      </div>

      {/* The transform: raw → sanitized */}
      <div className="mt-5 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
        {/* RAW */}
        <div className="relative overflow-hidden rounded-xl border border-signal-risk/25 bg-card shadow-card-sm">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-signal-risk-soft text-signal-risk"><Eye className="h-3.5 w-3.5" /></span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-signal-risk">Raw narrative · restricted</p>
                <p className="font-display text-[13px] font-bold tracking-tight-bank text-ink">As received</p>
              </div>
            </div>
            <span className="flex items-center gap-1 rounded-full border border-signal-risk/30 bg-signal-risk-soft px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.06em] text-signal-risk"><Lock className="h-3 w-3" /> Vault</span>
          </div>
          <div className="relative p-4">
            {stage === 'redact' && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="scan-line absolute inset-x-0 top-0 h-[36px] animate-scan-sweep" />
              </div>
            )}
            <Narrative mode="raw" />
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-hairline pt-3">
              {(['highly', 'sensitive', 'internal'] as SensitivityTier[]).map((t) => (
                <span key={t} className="flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-subtle">
                  <span className={cn('h-1.5 w-1.5 rounded-full', tierStyle[t].dot)} /> {tierStyle[t].label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* arrow */}
        <div className="hidden items-center justify-center lg:flex">
          <div className={cn('grid h-10 w-10 place-items-center rounded-full border bg-card shadow-card-sm transition-colors', showSafe ? 'border-azure/40 text-azure' : 'border-hairline text-ink-faint')}>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        {/* SANITIZED */}
        <div className={cn('relative overflow-hidden rounded-xl border bg-card shadow-card-sm transition-colors', showSafe ? 'border-azure/40' : 'border-hairline')}>
          <div className="azure-rule" aria-hidden />
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-azure text-white shadow-volt-glow"><EyeOff className="h-3.5 w-3.5" /></span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-azure-deep">Sanitized · analytics-safe</p>
                <p className="font-display text-[13px] font-bold tracking-tight-bank text-ink">Lodestar output</p>
              </div>
            </div>
            {showSafe && <span className="flex items-center gap-1 rounded-full border border-azure/30 bg-azure-soft px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.06em] text-azure-deep"><CheckCircle2 className="h-3 w-3" /> No PII</span>}
          </div>
          <div className="relative p-4">
            {showSafe ? (
              <div className="animate-fade-in">
                <Narrative mode="safe" />
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-hairline pt-3">
                  <span className="flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-subtle"><span className="redaction-bar h-2.5 w-4" /> Redacted</span>
                  <span className="flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-subtle"><span className="h-2.5 w-4 rounded bg-azure-soft ring-1 ring-azure/30" /> Abstracted</span>
                  <span className="flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-subtle"><span className="h-2.5 w-4 rounded bg-steel-100 ring-1 ring-steel-200" /> Generalized</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 py-1">
                {[88, 76, 92, 64].map((w, i) => (
                  <div key={i} className="h-3.5 animate-pulse-soft rounded bg-canvas-subtle" style={{ width: `${w}%`, animationDelay: `${i * 0.12}s` }} />
                ))}
                <p className="pt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">{stage === 'classify' ? 'Classifying & locating identifiers…' : 'Awaiting redaction…'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Classification + counts */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <div className={cn('relative overflow-hidden rounded-xl border bg-card p-5 shadow-card-sm transition-opacity', showClass ? 'opacity-100' : 'opacity-40')}>
          <SectionHead title="AI classification" hint="sensitivity tier" icon={ShieldCheck} />
          {showClass ? (
            <div className="mt-4 animate-fade-in">
              <div className="flex items-center justify-between rounded-lg border border-signal-risk/30 bg-signal-risk-soft px-3.5 py-3">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-signal-risk">Classified</p>
                  <p className="font-display text-[18px] font-bold tracking-tight-bank text-signal-risk">{classification.label}</p>
                </div>
                <span className="rounded-full bg-card px-2.5 py-1 font-mono text-[11px] font-semibold tabular text-signal-risk">{Math.round(classification.confidence * 100)}%</span>
              </div>
              <div className="mt-3 flex gap-1.5">
                {tiers.map((t) => (
                  <div key={t.key} className={cn('flex-1 rounded-md border px-2 py-1.5 text-center', t.key === classification.tier ? 'border-signal-risk/40 bg-signal-risk-soft' : 'border-hairline bg-canvas-subtle/50')}>
                    <p className={cn('font-mono text-[8.5px] font-semibold uppercase tracking-[0.04em]', t.key === classification.tier ? 'text-signal-risk' : 'text-ink-faint')}>{t.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-ink-muted">{classification.reason}</p>
            </div>
          ) : (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">Awaiting classification…</p>
          )}
        </div>

        {/* Explainability ledger */}
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Explainability log" hint={`${entityOrder.length} entities · what changed & why`} icon={ListChecks} action={
            <div className="hidden items-center gap-2 sm:flex">
              <span className="rounded-full bg-signal-risk-soft px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.05em] text-signal-risk">{counts.redacted} redacted</span>
              <span className="rounded-full bg-azure-soft px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.05em] text-azure-deep">{counts.abstracted} abstracted</span>
              <span className="rounded-full bg-steel-100 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.05em] text-steel-600">{counts.generalized} generalized</span>
            </div>
          } />
          {done ? (
            <div className="mt-3 overflow-hidden rounded-lg border border-hairline">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-hairline bg-canvas-subtle/60 font-mono text-[9px] uppercase tracking-[0.08em] text-ink-subtle">
                    <th className="px-3 py-2 font-medium">Detected</th>
                    <th className="px-3 py-2 font-medium">Type</th>
                    <th className="px-3 py-2 font-medium">Action</th>
                    <th className="hidden px-3 py-2 font-medium md:table-cell">Why</th>
                  </tr>
                </thead>
                <tbody>
                  {entityOrder.map((id, i) => {
                    const e = entities[id]
                    return (
                      <tr key={id} className="border-b border-hairline/70 last:border-0 animate-stream-in" style={{ animationDelay: `${i * 0.05}s` }}>
                        <td className="px-3 py-2">
                          <span className="font-mono text-[11px] font-medium text-ink line-through decoration-signal-risk/50">{e.raw}</span>
                        </td>
                        <td className="px-3 py-2 text-[11.5px] text-ink-muted">{e.type}</td>
                        <td className="px-3 py-2">
                          <span className={cn('rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.04em]', actionStyle[e.action])}>{e.action}</span>
                          <span className="ml-1.5 font-mono text-[11px] text-azure-deep">{e.replacement}</span>
                        </td>
                        <td className="hidden px-3 py-2 text-[11.5px] leading-snug text-ink-muted md:table-cell">{e.reason}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {entityOrder.slice(0, 4).map((id, i) => (
                <div key={id} className="h-8 animate-pulse-soft rounded-lg bg-canvas-subtle" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
              <p className="pt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">Log populates after redaction…</p>
            </div>
          )}
        </div>
      </div>

      {/* Preserved signal + privacy rules */}
      <div className={cn('mt-5 grid gap-5 transition-opacity lg:grid-cols-[1.4fr_1fr]', done ? 'opacity-100' : 'opacity-40')}>
        <div className="rounded-xl border border-azure/30 bg-card p-5 shadow-card-sm">
          <SectionHead title="Analytical signal preserved" hint="meaning kept for pattern detection" icon={Layers} />
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {preservedSignal.map((p) => (
              <div key={p.label} className="rounded-lg border border-hairline bg-canvas-subtle/40 px-3 py-2.5">
                <p className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-ink-faint">{p.label}</p>
                <p className="mt-1 text-[12px] font-semibold leading-snug text-ink">{p.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-azure-deep"><CheckCircle2 className="h-3.5 w-3.5" /> Re-identification risk checked · cleared</p>
        </div>

        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Privacy rules applied" hint="MACN · member · case" icon={KeyRound} />
          <div className="mt-4 space-y-2.5">
            {privacyRules.map((r) => (
              <div key={r.scope} className="flex items-start gap-3 rounded-lg border border-hairline bg-canvas-subtle/40 px-3 py-2.5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-steel text-azure-glow"><ShieldCheck className="h-3.5 w-3.5" /></span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center justify-between text-[12.5px] font-semibold text-ink">{r.scope}<span className="font-mono text-[10px] text-ink-faint">{r.count} applied</span></p>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-ink-muted">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dual output */}
      <div className={cn('mt-5 grid gap-5 transition-opacity sm:grid-cols-2', done ? 'opacity-100' : 'opacity-40')}>
        {outputs.map((o) => (
          <div key={o.key} className={cn('relative overflow-hidden rounded-xl border bg-card p-5 shadow-card-sm', o.tone === 'safe' ? 'border-azure/40' : 'border-steel-200')}>
            {o.tone === 'safe' && <div className="azure-rule" aria-hidden />}
            <div className="flex items-center gap-2.5">
              <span className={cn('grid h-9 w-9 place-items-center rounded-lg text-white', o.tone === 'safe' ? 'bg-azure shadow-volt-glow' : 'bg-steel')}>
                {o.tone === 'safe' ? <EyeOff className="h-4 w-4" /> : <Lock className="h-4 w-4 text-azure-glow" />}
              </span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-subtle">{o.tone === 'safe' ? 'AI-safe layer' : 'Restricted layer'}</p>
                <p className="font-display text-[15px] font-bold tracking-tight-bank text-ink">{o.name}</p>
              </div>
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-ink-muted">{o.desc}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {o.chips.map((c) => (
                <span key={c} className={cn('rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.05em]', o.tone === 'safe' ? 'border-azure/30 bg-azure-soft text-azure-deep' : 'border-steel-200 bg-canvas-subtle text-steel-600')}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
