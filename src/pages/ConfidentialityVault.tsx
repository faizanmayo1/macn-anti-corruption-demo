import { useState } from 'react'
import {
  Building2,
  Clock,
  Eye,
  EyeOff,
  FileLock2,
  Globe2,
  KeyRound,
  Layers,
  Lock,
  ScrollText,
  ShieldCheck,
  UserCog,
} from 'lucide-react'

import { PageHeader, HeaderStat } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import {
  accessLog,
  externalAggregate,
  governanceControls,
  narrativeByPersona,
  personas,
  recordFields,
  tierArch,
  type AccessLogEntry,
  type FieldState,
  type Persona,
  type TierArch,
} from '@/data/vault'
import { cn } from '@/utils/cn'

const personaIcon: Record<Persona, typeof Eye> = { analyst: UserCog, member: Building2, external: Globe2 }

const stateMeta: Record<FieldState, { label: string; icon: typeof Eye; cls: string }> = {
  clear: { label: 'Visible', icon: Eye, cls: 'text-signal-positive' },
  encrypted: { label: 'Visible · encrypted', icon: ShieldCheck, cls: 'text-azure-deep' },
  redacted: { label: 'Redacted', icon: EyeOff, cls: 'text-signal-risk' },
  abstracted: { label: 'Abstracted', icon: Eye, cls: 'text-azure-deep' },
  aggregated: { label: 'Aggregated', icon: Layers, cls: 'text-steel-600' },
  hidden: { label: 'Hidden', icon: EyeOff, cls: 'text-ink-faint' },
}

const logTone: Record<AccessLogEntry['tone'], string> = {
  analyst: 'bg-azure', system: 'bg-steel-500', member: 'bg-signal-positive', external: 'bg-gold', admin: 'bg-signal-risk',
}

const tierTone: Record<TierArch['tone'], { bar: string; chip: string }> = {
  vault: { bar: 'bg-signal-risk', chip: 'text-signal-risk bg-signal-risk-soft border-signal-risk/30' },
  insights: { bar: 'bg-azure', chip: 'text-azure-deep bg-azure-soft border-azure/30' },
  member: { bar: 'bg-signal-positive', chip: 'text-signal-positive bg-signal-positive-soft border-signal-positive/30' },
}

function FieldValue({ text, state }: { text: string; state: FieldState }) {
  if (state === 'redacted') return <span className="redaction-bar inline-flex items-center rounded px-1.5 py-px font-mono text-[11.5px] !text-canvas">{text}</span>
  if (state === 'abstracted') return <span className="inline-flex items-center rounded bg-azure-soft px-1.5 py-px font-medium text-azure-deep">{text}</span>
  if (state === 'aggregated') return <span className="inline-flex items-center rounded bg-steel-100 px-1.5 py-px font-medium text-steel-700">{text}</span>
  if (state === 'hidden') return <span className="inline-flex items-center gap-1 font-mono text-[12px] text-ink-faint"><EyeOff className="h-3 w-3" /> {text}</span>
  return (
    <span className="inline-flex items-center gap-1.5 font-medium text-ink">
      {text}
      {state === 'encrypted' && <Lock className="h-3 w-3 text-azure-deep" />}
    </span>
  )
}

export function ConfidentialityVault() {
  const [active, setActive] = useState<Persona>('analyst')
  const persona = personas.find((p) => p.key === active)!
  const narrative = narrativeByPersona[active]

  const scope = recordFields.reduce(
    (acc, f) => {
      const s = f.values[active].state
      if (s === 'clear' || s === 'encrypted') acc.visible += 1
      else if (s === 'hidden') acc.hidden += 1
      else acc.masked += 1
      return acc
    },
    { visible: 0, masked: 0, hidden: 0 },
  )

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Governance · Controlled Access"
        title="One incident. Seen only as far as you’re permitted."
        description="The same record — INC-08842 — rendered for three access tiers. Switch personas to watch identities redact, locations abstract, and detail collapse to aggregates, with every field governed by role and logged on access."
        meta={
          <>
            <HeaderStat label="access tiers" value="3" />
            <HeaderStat label="encrypted fields" value="4" tone="azure" />
            <HeaderStat label="temporary grants" value="2" tone="warning" />
            <HeaderStat label="every access" value="logged" tone="azure" />
          </>
        }
      />

      {/* Persona switcher */}
      <div className="mt-6 rounded-xl border border-hairline bg-card p-2 shadow-card-sm">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {personas.map((p) => {
            const Icon = personaIcon[p.key]
            const on = p.key === active
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setActive(p.key)}
                className={cn('flex items-center gap-3 rounded-lg border px-3.5 py-3 text-left transition-all', on ? 'border-azure/50 bg-azure-soft/50 shadow-volt-glow' : 'border-hairline bg-card hover:bg-canvas-subtle')}
              >
                <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-lg', on ? 'bg-azure text-white' : 'bg-canvas-subtle text-ink-muted')}><Icon className="h-4 w-4" /></span>
                <div className="min-w-0">
                  <p className={cn('truncate text-[13px] font-semibold', on ? 'text-ink' : 'text-ink-muted')}>{p.name}</p>
                  <p className="truncate font-mono text-[9px] uppercase tracking-[0.06em] text-ink-faint">{p.access}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Record + scope */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className={cn('relative overflow-hidden rounded-xl border bg-card shadow-card-sm', active === 'analyst' ? 'border-signal-risk/30' : active === 'member' ? 'border-azure/40' : 'border-steel-200')}>
          <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
            <SectionHead title="Incident record · INC-08842" hint={`${persona.tier} · ${persona.access}`} icon={FileLock2} />
            <span className={cn('flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.06em]',
              active === 'analyst' ? 'border-signal-risk/30 bg-signal-risk-soft text-signal-risk' : active === 'member' ? 'border-azure/30 bg-azure-soft text-azure-deep' : 'border-steel-200 bg-canvas-subtle text-steel-600')}>
              {active === 'analyst' ? <Lock className="h-3 w-3" /> : active === 'member' ? <EyeOff className="h-3 w-3" /> : <Layers className="h-3 w-3" />}
              {active === 'analyst' ? 'Full' : active === 'member' ? 'Anonymized' : 'Aggregated'}
            </span>
          </div>

          {active === 'external' ? (
            <div className="animate-fade-in p-6">
              <div className="rounded-xl border border-steel-200 bg-canvas-subtle/40 p-5 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle">Regional aggregate · {externalAggregate.risk}</p>
                <p className="mt-2 font-display text-[40px] font-extrabold leading-none tabular tracking-tight-bank text-ink">{externalAggregate.stat}</p>
                <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-ink-muted">{externalAggregate.context}</p>
              </div>
              <p className="mt-4 flex items-start gap-2 rounded-lg border border-hairline bg-canvas-subtle/40 px-3 py-2.5 text-[12px] leading-snug text-ink-muted">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-azure-deep" /> {externalAggregate.note}
              </p>
            </div>
          ) : (
            <div className="animate-fade-in p-5">
              <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {recordFields.map((f) => (
                  <div key={f.key} className="flex items-baseline justify-between gap-3 border-b border-hairline/60 pb-2.5">
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-faint">
                      {f.label}{f.encrypted && <Lock className="h-2.5 w-2.5 text-ink-faint" />}
                    </span>
                    <span className="text-right text-[12.5px]"><FieldValue text={f.values[active].text} state={f.values[active].state} /></span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-hairline bg-canvas-subtle/40 p-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-subtle">Narrative</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">{narrative.text}</p>
              </div>
            </div>
          )}
        </div>

        {/* Access scope */}
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Access scope" hint="for this persona" icon={ShieldCheck} />
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-hairline bg-canvas-subtle/40 px-3.5 py-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-steel text-[12px] font-semibold text-white">{persona.initials}</span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-ink">{persona.name}</p>
              <p className="truncate font-mono text-[9.5px] uppercase tracking-[0.06em] text-ink-faint">{persona.role}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-signal-positive/30 bg-signal-positive-soft/50 px-2 py-2.5 text-center">
              <p className="font-display text-[20px] font-bold tabular text-signal-positive">{scope.visible}</p>
              <p className="font-mono text-[8px] uppercase tracking-[0.06em] text-ink-subtle">Visible</p>
            </div>
            <div className="rounded-lg border border-azure/30 bg-azure-soft/40 px-2 py-2.5 text-center">
              <p className="font-display text-[20px] font-bold tabular text-azure-deep">{scope.masked}</p>
              <p className="font-mono text-[8px] uppercase tracking-[0.06em] text-ink-subtle">Masked</p>
            </div>
            <div className="rounded-lg border border-hairline bg-canvas-subtle/60 px-2 py-2.5 text-center">
              <p className="font-display text-[20px] font-bold tabular text-ink-faint">{scope.hidden}</p>
              <p className="font-mono text-[8px] uppercase tracking-[0.06em] text-ink-subtle">Hidden</p>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            {(['clear', 'encrypted', 'abstracted', 'redacted', 'hidden'] as FieldState[]).map((s) => {
              const m = stateMeta[s]
              const Icon = m.icon
              return (
                <div key={s} className="flex items-center gap-2 font-mono text-[10px] text-ink-subtle">
                  <Icon className={cn('h-3.5 w-3.5', m.cls)} /> {m.label}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Access matrix + log */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Field-level access matrix" hint="who can see what" icon={KeyRound} />
          <div className="mt-3 overflow-hidden rounded-lg border border-hairline">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-hairline bg-canvas-subtle/60 font-mono text-[9px] uppercase tracking-[0.07em] text-ink-subtle">
                  <th className="px-3 py-2 font-medium">Field</th>
                  {personas.map((p) => (
                    <th key={p.key} className={cn('px-3 py-2 text-center font-medium', p.key === active && 'text-azure-deep')}>{p.key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recordFields.map((f) => (
                  <tr key={f.key} className="border-b border-hairline/70 last:border-0">
                    <td className="px-3 py-2 text-[11.5px] font-medium text-ink">{f.label}</td>
                    {personas.map((p) => {
                      const m = stateMeta[f.values[p.key].state]
                      const Icon = m.icon
                      return (
                        <td key={p.key} className={cn('px-3 py-2 text-center', p.key === active && 'bg-azure-soft/30')}>
                          <Icon className={cn('mx-auto h-3.5 w-3.5', m.cls)} />
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Access log" hint="immutable · every interaction" icon={ScrollText} />
          <div className="mt-3 space-y-2.5">
            {accessLog.map((l) => (
              <div key={l.id} className="flex items-start gap-2.5">
                <span className={cn('mt-1 h-2 w-2 shrink-0 rounded-full', logTone[l.tone])} />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium text-ink">{l.actor} <span className="font-mono text-[9.5px] font-normal uppercase tracking-[0.05em] text-ink-faint">· {l.role}</span></p>
                  <p className="text-[11.5px] leading-snug text-ink-muted">{l.action}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.05em] text-ink-faint">{l.meta} · {l.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tier architecture + governance */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Three-tier data architecture" hint="separation by sensitivity" icon={Layers} />
          <div className="mt-4 space-y-2.5">
            {tierArch.map((t, i) => (
              <div key={t.key} className="relative flex items-center gap-3 overflow-hidden rounded-lg border border-hairline bg-canvas-subtle/40 px-4 py-3" style={{ marginLeft: `${i * 18}px` }}>
                <span className={cn('absolute inset-y-0 left-0 w-1', tierTone[t.tone].bar)} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink">{t.name}</p>
                  <p className="text-[11.5px] leading-snug text-ink-muted">{t.desc}</p>
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <span className={cn('rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.05em]', tierTone[t.tone].chip)}>{t.who}</span>
                  <p className="mt-1 font-mono text-[9.5px] text-ink-faint">{t.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
          <SectionHead title="Governance controls" hint="defensible by design" icon={ShieldCheck} />
          <div className="mt-4 space-y-2.5">
            {governanceControls.map((g) => {
              const Icon = g.key === 'enc' ? FileLock2 : g.key === 'time' ? Clock : g.key === 'nda' ? KeyRound : ScrollText
              return (
                <div key={g.key} className="flex items-center gap-3 rounded-lg border border-hairline bg-canvas-subtle/40 px-3 py-2.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-steel text-azure-glow"><Icon className="h-3.5 w-3.5" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center justify-between text-[12.5px] font-semibold text-ink">{g.label}<span className="font-mono text-[10px] text-azure-deep">{g.value}</span></p>
                    <p className="text-[11px] leading-snug text-ink-muted">{g.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
