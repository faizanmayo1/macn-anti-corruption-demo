import { useState } from 'react'
import {
  ArrowUpRight,
  CheckCircle2,
  CornerDownLeft,
  FileSearch,
  Layers,
  ListChecks,
  Lock,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import { PageHeader, HeaderStat } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import { capabilities, conversations } from '@/data/copilot'
import { persona } from '@/data/macn'
import { cn } from '@/utils/cn'

export function LodestarCopilot() {
  const [activeId, setActiveId] = useState(conversations[0].id)
  const convo = conversations.find((c) => c.id === activeId)!

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Assistant · Ask · Explain · Trace"
        title="Ask the data. Trust every answer."
        description="A natural-language way to interrogate the sanitized intelligence layer. Every answer is cited to its sources and backed by a traceable decision rationale — and the copilot never surfaces restricted-vault content."
        meta={
          <>
            <HeaderStat label="grounded in" value="sanitized layer" tone="azure" />
            <HeaderStat label="answers" value="cited" tone="positive" />
            <HeaderStat label="vault access" value="never" tone="risk" />
          </>
        }
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        {/* Chat */}
        <div className="flex flex-col rounded-xl border border-hairline bg-card shadow-card-sm">
          <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-azure text-white shadow-volt-glow"><Sparkles className="h-4 w-4" /></span>
              <div>
                <p className="font-display text-[14px] font-bold tracking-tight-bank text-ink">Lodestar Copilot</p>
                <p className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.08em] text-signal-positive"><span className="h-1.5 w-1.5 rounded-full bg-signal-positive" /> online · sanitized layer</p>
              </div>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full border border-hairline bg-canvas-subtle px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-ink-subtle sm:flex"><Lock className="h-3 w-3" /> No PII</span>
          </div>

          {/* Conversation */}
          <div className="flex-1 space-y-4 p-5">
            {/* user */}
            <div className="flex items-start justify-end gap-2.5">
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-steel px-4 py-2.5 text-[13px] leading-snug text-white">{convo.prompt}</div>
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-canvas-subtle text-[10px] font-semibold text-ink-muted">{persona.initials}</span>
            </div>

            {/* lodestar */}
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-azure text-white shadow-volt-glow"><Sparkles className="h-3.5 w-3.5" /></span>
              <div className="min-w-0 max-w-[88%] animate-fade-in rounded-2xl rounded-tl-sm border border-azure/30 bg-azure-soft/30 px-4 py-3">
                <p className="text-[13px] font-semibold leading-snug text-ink">{convo.answer.lead}</p>
                <ul className="mt-2.5 space-y-1.5">
                  {convo.answer.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[12px] leading-snug text-ink-muted">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-azure-deep" /> {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-azure/20 pt-2.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-faint">Sources:</span>
                  {convo.answer.citations.map((c) => (
                    <span key={c} className="rounded-full border border-azure/30 bg-card px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.05em] text-azure-deep">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Suggested + input */}
          <div className="border-t border-hairline p-4">
            <div className="flex flex-wrap gap-2">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  className={cn('rounded-full border px-3 py-1.5 text-left font-mono text-[10px] uppercase tracking-[0.04em] transition-colors', c.id === activeId ? 'border-azure/50 bg-azure-soft text-azure-deep' : 'border-hairline bg-card text-ink-muted hover:bg-canvas-subtle')}
                >
                  {c.prompt}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-full border border-hairline bg-canvas-subtle/60 px-4 py-2.5">
              <input disabled placeholder="Ask Lodestar about ports, corridors, typologies, members…" className="flex-1 bg-transparent text-[12.5px] text-ink placeholder:text-ink-faint focus:outline-none" />
              <span className="hidden items-center gap-1 font-mono text-[9px] uppercase tracking-[0.06em] text-ink-faint sm:flex"><CornerDownLeft className="h-3 w-3" /> send</span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-azure text-white"><Send className="h-3.5 w-3.5" /></span>
            </div>
          </div>
        </div>

        {/* Decision audit */}
        <div className="relative overflow-hidden rounded-xl border border-azure/30 bg-card p-5 shadow-card-sm lg:sticky lg:top-20 lg:self-start">
          <div className="azure-rule" aria-hidden />
          <div className="flex items-center justify-between">
            <SectionHead title="Decision audit" hint="why this answer" icon={ListChecks} />
            <span className="rounded-full border border-azure/30 bg-azure-soft px-2 py-0.5 font-mono text-[10px] font-semibold tabular text-azure-deep">{Math.round(convo.audit.confidence * 100)}%</span>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-lg border border-signal-positive/30 bg-signal-positive-soft/50 px-3 py-2">
            <ShieldCheck className="h-4 w-4 shrink-0 text-signal-positive" />
            <p className="text-[11.5px] leading-snug text-ink"><span className="font-semibold">Access tier:</span> {convo.audit.tier}</p>
          </div>

          <div className="mt-3">
            <p className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-subtle"><FileSearch className="h-3.5 w-3.5" /> Sources used</p>
            <div className="mt-2 space-y-1.5">
              {convo.audit.sources.map((s) => (
                <div key={s} className="flex items-center gap-2 rounded-lg border border-hairline bg-canvas-subtle/40 px-2.5 py-1.5 text-[11.5px] text-ink-muted">
                  <Layers className="h-3.5 w-3.5 shrink-0 text-azure-deep" /> {s}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-subtle">Reasoning</p>
            <ol className="mt-2 space-y-1.5">
              {convo.audit.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-2 text-[11.5px] leading-snug text-ink-muted">
                  <span className="mt-px grid h-4 w-4 shrink-0 place-items-center rounded-full bg-steel font-mono text-[8px] font-semibold text-white">{i + 1}</span> {s}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-3 rounded-lg border border-hairline bg-canvas-subtle/40 px-3 py-2.5">
            <p className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.08em] text-signal-risk"><Lock className="h-3.5 w-3.5" /> Not accessed</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {convo.audit.excluded.map((e) => (
                <span key={e} className="rounded-full border border-signal-risk/20 bg-signal-risk-soft px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.04em] text-signal-risk">{e}</span>
              ))}
            </div>
          </div>

          <button type="button" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-azure px-3.5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-white shadow-cta transition-transform hover:-translate-y-0.5">
            Escalate to MACN analyst <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Capabilities */}
      <div className="mt-5 rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
        <SectionHead title="What Lodestar can do" hint="governed by design" icon={Sparkles} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c} className="flex items-start gap-2.5 rounded-lg border border-hairline bg-canvas-subtle/40 px-3.5 py-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-azure-deep" />
              <p className="text-[12px] leading-snug text-ink-muted">{c}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
