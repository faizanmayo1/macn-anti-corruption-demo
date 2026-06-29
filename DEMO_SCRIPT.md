# MACN OS — Live Demo Script

A ~12–15 minute click-through for the call with **Ignacio** (and team). One golden thread runs the whole way: **a sensitive report at Lagos (Apapa) → anonymized → linked to Salesforce → correlated into an emerging corruption corridor → governed, audited, and shared safely.**

Driver: **Adnan**. Run `npm run dev` and present full-screen. Persona shown throughout: *Sofia Marín — MACN Intelligence Analyst.*

> **The framing line to open with:** *"You told us your hardest problem is handling sensitive qualitative data safely. So we built the whole platform around that — let me show you the moment that solves it, then everything it unlocks."*

---

## 0 · Open — Command Center (`/`) · ~90s
**Show:** the global risk map (Gulf of Guinea cluster pulsing), the KPI band, the Lodestar digest.
**Say:** "This is one secure layer over *all* your corruption signals — 10,000 structured Salesforce incidents and 5,000 sensitive qualitative reports, unified. Salesforce stays your system of record; we add the intelligence."
**Point to:** the "98.7% auto-sanitized" KPI and the raw→sanitized strip. "Notice safety is on the front page, not an afterthought."
**Tie-in:** sets scale + signals that confidentiality is the organizing principle.

## 1 · The hero — Anonymization Engine (`/anonymize`) · ~3 min ⭐
**Show:** click **Replay** so the pipeline animates: Ingest → Classify → Redact & Abstract → Dual Output.
**Say:** "Here's a real whistleblower narrative — names the master, the inspector, the vessel, the company, the berth. Watch Lodestar handle it."
**Point to, in order:**
- Classification → **"Highly Sensitive, 96%."**
- The raw→sanitized transform → identities become redaction bars; "berth 12, Apapa" becomes "Lagos / West Africa."
- The **Explainability log** → "Every removal is logged — *what* was removed and *why*. That's your defensibility."
- **Analytical signal preserved** → "Critical detail is gone, but the typology, severity and actor type survive — so analytics still works."
- **Dual output** → "Raw goes to an encrypted vault; the safe version feeds everything else."
**Tie-in (Ignacio):** this is the answer to the core concern — say so explicitly.

## 2 · The unified record — Incident Intelligence (`/incident`) · ~2 min
**Show:** the Incident Intelligence Object — Structured ＋ Narrative → Unified.
**Say:** "The Salesforce case is untouched and authoritative. Lodestar links four qualitative reports to it, normalizes the taxonomy, and writes AI fields *back* into Salesforce — risk score, typology, corridor link. No second system of record, no disruption."
**Point to:** the version history (v1→v5) → "fully versioned and auditable."

## 3 · The payoff — Pattern & Risk (`/patterns`) · ~2.5 min
**Show:** the emerging **Gulf of Guinea corridor** card (Lagos→Lomé→Tema spine), then the forecast chart.
**Say:** "Those sanitized reports become a *pattern*. Lodestar correlated 23 of them sharing one typology across three ports — and flagged the corridor **19 days before it would hit formal reporting.**"
**Point to:** the forecast's "Detected · 19d early" marker vs. the "formal-reporting threshold" line. "That lead time is the whole value — reactive becomes proactive."

## 4 · Governance — Confidentiality Vault (`/vault`) · ~2 min
**Show:** the **persona switcher** — click through Analyst → Member → External on the *same* incident.
**Say:** "Same record, three tiers. The analyst sees everything; the member sees the anonymized version; the outside world sees only an aggregate — '213 incidents in West Africa,' nothing more."
**Point to:** the field-level access matrix + access log. "Role-based, field-level encrypted, every access logged."

## 5 · Defensibility — Audit & Lineage (`/audit`) · ~1.5 min
**Show:** click the **Insight** node, then walk a couple of stages up the spine.
**Say:** "Click any insight and trace it end-to-end — source → normalization → anonymization → AI → output. Every step is content-hashed and immutable, and exports as a compliance package."
**Tie-in:** "This is what makes it audit-ready and regulator-defensible."

## 6 · Member value — Member Portal (`/members`) · ~1.5 min
**Show:** the member view ("Northwind Carriers").
**Say:** "This is what a member logs in to see — high-risk ports *on their routes*, anonymized trends, and concrete mitigations. Real value delivered, zero sensitive leakage."

## 7 · Capstone — Lodestar Copilot (`/copilot`) · ~1.5 min
**Show:** the cited answer; click a different suggested prompt to switch.
**Say:** "Ask in plain language. Every answer is cited and comes with a decision-audit — the sources it used, its reasoning, and proof it **never touched the restricted vault.**"
**Close:** "From a single sensitive report to governed, trusted, board-ready intelligence — safely, the whole way."

---

## If asked / likely questions
- **"Is our Salesforce data duplicated?"** → No — augmentation layer, AI fields written back, Salesforce remains system of record (show `/incident`).
- **"Who can see the raw reports?"** → Only MACN admins, in the encrypted vault; everything downstream is sanitized (show `/vault`).
- **"How do we prove what the AI did?"** → Full immutable lineage + explainability log (show `/audit` + `/anonymize`).
- **"Is this real data?"** → Pilot-scale illustrative data modeling your environment (50 ports, 20 corridors, 30 members, 5-yr history); pilot would run on your actual Salesforce + reports.

## Pilot ask (close)
Propose a scoped pilot on a slice of real data — a handful of ports/corridors — to validate anonymization quality and pattern detection against MACN's own reports.
