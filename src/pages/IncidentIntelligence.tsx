import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Database,
  FileText,
  GitBranch,
  Layers,
  Link2,
  RefreshCw,
  Shuffle,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageHeader, HeaderStat } from '@/components/blueprint/PageHeader'
import { SectionHead } from '@/components/blueprint/SectionHead'
import {
  aiEnrichment,
  incidentObject,
  linkedReports,
  pushedFields,
  structuredFields,
  syncStatus,
  taxonomyMappings,
  versions,
  type LinkedReport,
} from '@/data/incident'
import { cn } from '@/utils/cn'

const sevStyle: Record<LinkedReport['severity'], string> = {
  critical: 'text-signal-risk bg-signal-risk-soft',
  high: 'text-gold-deep bg-gold-soft',
  medium: 'text-steel-600 bg-steel-100',
}

const kindIcon: Record<LinkedReport['kind'], typeof FileText> = {
  Whistleblower: FileText,
  'NGO report': FileText,
  'Member submission': Database,
  'Port intel': Layers,
}

export function IncidentIntelligence() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-7 lg:px-8">
      <PageHeader
        eyebrow="Intelligence · Unified Incident View"
        title="Structured record and narrative — resolved into one object."
        description="The Salesforce case stays the system of record. Lodestar links qualitative reports to it, normalizes the taxonomy, and writes AI fields back — producing one versioned Incident Intelligence Object without duplicating anything."
        actions={
          <>
            <span className="hidden items-center gap-1.5 rounded-full border border-hairline bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-subtle md:inline-flex">
              <Database className="h-3.5 w-3.5 text-azure-deep" /> {incidentObject.sfCase}
            </span>
            <Link to="/anonymize" className="inline-flex items-center gap-2 rounded-full bg-steel px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-white shadow-cta transition-transform hover:-translate-y-0.5">
              <Sparkles className="h-3.5 w-3.5 text-azure-glow" /> View anonymization
            </Link>
          </>
        }
        meta={
          <>
            <HeaderStat label="incident object" value={incidentObject.id} />
            <HeaderStat label="linked reports" value={`${incidentObject.linkedCount}`} tone="azure" />
            <HeaderStat label="version" value={`v${incidentObject.version}`} />
            <HeaderStat label="severity" value={incidentObject.severity} tone="risk" />
          </>
        }
      />

      {/* Unified object header */}
      <div className="mt-6 overflow-hidden rounded-xl border border-azure/30 bg-card shadow-card-sm">
        <div className="azure-rule" aria-hidden />
        <div className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-steel text-azure-glow"><Workflow className="h-5 w-5" /></span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-ink">{incidentObject.id}</span>
                <span className="rounded-full bg-signal-risk-soft px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.05em] text-signal-risk">{incidentObject.severity}</span>
                <span className="rounded-full bg-canvas-subtle px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.05em] text-ink-subtle">{incidentObject.status}</span>
              </div>
              <p className="mt-1 font-display text-[17px] font-bold leading-tight tracking-tight-bank text-ink">{incidentObject.title}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-faint">{incidentObject.port} · {incidentObject.region} · {incidentObject.corridor} corridor</p>
            </div>
          </div>
          {/* merge glyph */}
          <div className="flex items-center gap-2 rounded-lg border border-hairline bg-canvas-subtle/40 px-4 py-3">
            <div className="text-center">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-steel-100 text-steel-600"><Database className="h-4 w-4" /></span>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.05em] text-ink-faint">Structured</p>
            </div>
            <span className="text-ink-faint">＋</span>
            <div className="text-center">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-steel-100 text-steel-600"><FileText className="h-4 w-4" /></span>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.05em] text-ink-faint">Narrative</p>
            </div>
            <ArrowRight className="h-4 w-4 text-azure" />
            <div className="text-center">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-azure text-white shadow-volt-glow"><Layers className="h-4 w-4" /></span>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.05em] text-azure-deep">Unified</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        {/* LEFT */}
        <div className="space-y-5">
          {/* Structured fields */}
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Structured record" hint="Salesforce · system of record" icon={Database} action={
              <span className="flex items-center gap-1 rounded-full border border-hairline bg-canvas-subtle px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.06em] text-ink-subtle"><Database className="h-3 w-3 text-azure-deep" /> Source of truth</span>
            } />
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {structuredFields.map((f) => (
                <div key={f.label} className="border-b border-hairline/60 pb-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.06em] text-ink-faint">{f.label}</p>
                  <p className="mt-0.5 text-[12.5px] font-medium text-ink">{f.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Linked qualitative reports */}
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Linked qualitative reports" hint="enriched by Lodestar" icon={Link2} action={
              <span className="rounded-full bg-azure-soft px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.05em] text-azure-deep">{linkedReports.length} linked</span>
            } />
            <div className="reveal mt-4 space-y-2.5">
              {linkedReports.map((r) => {
                const Icon = kindIcon[r.kind]
                return (
                  <div key={r.id} className={cn('rounded-lg border bg-canvas-subtle/40 px-3.5 py-3 transition-colors hover:bg-canvas-subtle', r.hero ? 'border-azure/40' : 'border-hairline')}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="grid h-6 w-6 place-items-center rounded-md bg-card text-ink-muted"><Icon className="h-3.5 w-3.5" /></span>
                        <span className="font-mono text-[11px] font-medium text-ink">{r.id}</span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.05em] text-ink-faint">{r.kind}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn('rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.04em]', sevStyle[r.severity])}>{r.severity}</span>
                        <span className="flex items-center gap-1 font-mono text-[9.5px] text-azure-deep"><Link2 className="h-3 w-3" /> {Math.round(r.confidence * 100)}%</span>
                      </div>
                    </div>
                    <p className="mt-2 text-[12px] leading-snug text-ink-muted">{r.snippet}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Normalized taxonomy */}
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Normalized taxonomy" hint="free-text → standard fields" icon={Shuffle} />
            <div className="mt-4 space-y-2">
              {taxonomyMappings.map((t) => (
                <div key={t.field} className="flex flex-col gap-2 rounded-lg border border-hairline bg-canvas-subtle/40 px-3.5 py-2.5 sm:flex-row sm:items-center">
                  <span className="flex-1 font-mono text-[11.5px] text-ink-muted">{t.raw}</span>
                  <ArrowRight className="hidden h-3.5 w-3.5 shrink-0 text-azure sm:block" />
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold text-ink">{t.normalized}</span>
                    <span className="rounded-full bg-azure-soft px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.05em] text-azure-deep">{t.field}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-5">
          {/* AI enrichment */}
          <div className="relative overflow-hidden rounded-xl border border-azure/30 bg-card p-5 shadow-card-sm">
            <div className="aurora-wash pointer-events-none absolute inset-0 opacity-70" aria-hidden />
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-azure text-white shadow-volt-glow"><Sparkles className="h-3.5 w-3.5" /></span>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-azure-deep">Lodestar enrichment</p>
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-ink-muted">{aiEnrichment.summary}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {aiEnrichment.stats.map((s) => (
                  <div key={s.label} className="rounded-lg border border-hairline bg-card px-3 py-2">
                    <p className="font-mono text-[8.5px] uppercase tracking-[0.06em] text-ink-faint">{s.label}</p>
                    <p className="mt-0.5 text-[13px] font-bold text-ink">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pushed back to Salesforce */}
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Pushed to Salesforce" hint="AI fields written back" icon={RefreshCw} />
            <div className="mt-4 space-y-1.5">
              {pushedFields.map((f) => (
                <div key={f.field} className="flex items-start justify-between gap-3 border-b border-hairline/60 pb-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink-faint">{f.field}</span>
                  <span className="flex items-center gap-1.5 text-right text-[12px] font-medium text-ink">
                    {f.value}
                    <ArrowUpRight className="h-3 w-3 shrink-0 text-azure-deep" />
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-azure/30 bg-azure-soft/40 px-3 py-2">
              <RefreshCw className="h-3.5 w-3.5 shrink-0 text-azure-deep" />
              <p className="text-[11px] leading-snug text-ink-muted"><span className="font-semibold text-ink">{syncStatus.direction}</span> · synced {syncStatus.lastSync}. {syncStatus.note}</p>
            </div>
          </div>

          {/* Version history */}
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-card-sm">
            <SectionHead title="Version history" hint="versioned · auditable" icon={GitBranch} />
            <div className="mt-4">
              {versions.map((v, i) => {
                const last = i === versions.length - 1
                return (
                  <div key={v.v} className="relative flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[9px] font-semibold', last ? 'bg-azure text-white' : 'bg-canvas-subtle text-ink-muted')}>{v.v}</span>
                      {!last && <span className="my-1 w-0.5 flex-1 bg-hairline" />}
                    </div>
                    <div className="pb-3">
                      <p className="flex items-center gap-2 text-[12.5px] font-semibold text-ink">{v.label}<span className="font-mono text-[9px] font-normal text-ink-faint">{v.time}</span></p>
                      <p className="text-[11px] leading-snug text-ink-muted">{v.change}</p>
                      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.05em] text-ink-faint">by {v.actor}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <Link to="/audit" className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-azure-deep hover:underline">
              <CheckCircle2 className="h-3.5 w-3.5" /> Full lineage in Audit
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
