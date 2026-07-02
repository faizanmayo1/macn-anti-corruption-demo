# Prospect Follow-Up — DRAFT (sign as Fazal)

> Internal note: review before sending. Concise version first; longer version below if more detail is wanted. Do not send until Adnan/Fazal approve recipients and timing.

---

## Short version

**Subject:** MACN OS — the walkthrough we showed

Hi Ignacio,

Thank you for the time today. It was good to dig into MACN's challenge — and we built the demo squarely around the concern you raised: handling sensitive qualitative data safely.

A quick recap of what you saw:

- **Safe by design.** An AI guardrail sits between your sensitive data and the LLM — it classifies each report, redacts identities and abstracts locations, producing an analytics-safe version *before* any AI processes it, while preserving the analytical meaning and logging what was removed and why.
- **Salesforce augmented, not replaced.** Your case stays the system of record; we link qualitative reports to it, normalize the taxonomy, and write AI fields back — no duplication.
- **Proactive intelligence.** Sanitized reports correlate into patterns — in the demo, an emerging Gulf of Guinea corridor surfaced ~19 days ahead of formal reporting.
- **Dynamic, not static.** A Salesforce-integrated copilot lets members ask plain-language questions and get cited port-risk answers — moving beyond static Tableau dashboards. We can also redesign the existing dashboards for visual appeal and MACN branding.
- **Governed end to end.** Tiered access (analyst / member / external), field-level encryption, and immutable lineage for every AI insight — audit-ready.

The natural next step is a **scoped pilot on a slice of your real data** — a few ports and corridors — to validate anonymization quality and pattern detection against MACN's own reports. Happy to put a short plan together.

Would early next week suit for a 30-minute follow-up?

Best,
Fazal
CodeUpscale

---

## Longer version (if more detail is useful)

**Subject:** MACN OS — recap, and a proposed pilot

Hi Ignacio,

Thanks again for today's conversation. You were clear that the hard part isn't storing incidents — it's safely working with the *sensitive, qualitative* side of the data — so we designed the platform with that as the organizing principle rather than a feature bolted on the end.

What we walked through, mapped to what you asked for:

1. **Unified data layer (Salesforce + qualitative).** Structured Salesforce incidents (your GPIP data) and qualitative sources — free-text report comments and HelpDesk emails — resolve into one versioned "Incident Intelligence Object" — without disrupting your existing workflows.
2. **AI anonymization & redaction.** The core: automatic classification (public-safe → highly sensitive), identity removal, location abstraction, dual output (encrypted vault + sanitized analytics), and an explainability log for every transformation.
3. **Controlled access & confidentiality vault.** The same incident rendered for three tiers — analyst (full), member (anonymized), external (aggregated only) — with role-based, field-level controls and full access logging.
4. **Pattern detection & risk intelligence.** Clustering, port/route/actor risk scoring, and early-warning corridor detection ahead of formal reporting.
5. **Regulatory-grade auditability.** End-to-end lineage — source → anonymization → AI → output — immutable and exportable as a compliance package.
6. **Member-facing value.** Safe, aggregated intelligence members can act on: risk on their routes, anonymized trends, recommended mitigations — delivered through your existing member API and simple enough to act on at the port call.
7. **Dynamic copilot (beyond static dashboards).** A Salesforce-integrated, natural-language copilot that turns the sanitized layer into cited port-risk answers — replacing static Tableau views. We can also redesign the existing dashboards for visual appeal and MACN branding.

**Proposed pilot.** A focused engagement on a representative slice of your real environment — a handful of ports/corridors and a sample of qualitative reports — to prove out (a) anonymization quality and re-identification safety, (b) the Salesforce augmentation pattern, and (c) pattern-detection signal against your own historical data. We'd agree success criteria up front.

If helpful, we can share a one-page pilot outline and a short data-handling/security summary ahead of a follow-up. Would a 30-minute call early next week work?

Best,
Fazal
CodeUpscale
