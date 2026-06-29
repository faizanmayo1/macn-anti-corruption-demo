# MACN OS — Maritime Anti-Corruption Intelligence

Pre-sales demo for **MACN** (Maritime Anti-Corruption Network) — a secure AI intelligence platform that augments their **Salesforce** system of record. Built by **CodeUpscale** (Adnan lead; Fazal on prospect threads). The evaluator's core concern (Ignacio): **handling sensitive qualitative data safely** — so the hero of the demo is anonymization made visible.

## Positioning
An **AI intelligence layer over Salesforce** (augment, never replace). It centralizes structured incident records + sensitive qualitative reports, anonymizes them safely, and turns the corpus into proactive corruption intelligence — under strict confidentiality, governance and controlled access. AI brand = **Lodestar** (the guiding star clean shipping steers by).

## Hero flow (signature moment)
**Sensitive report INC-08842** — a whistleblower narrative naming a vessel master, a port inspector, a company, a ship and a berth, describing a **cash facilitation demand tied to an inspection hold at Lagos (Apapa)**. Lodestar classifies it **Highly Sensitive**, redacts identities, abstracts the berth → **“Lagos / West Africa,”** and emits an analytics-safe record that preserves typology + severity + actor type. It links to Salesforce case **SF-44719**, then correlates with **23 sanitized reports** across **Lagos · Lomé · Tema** to raise an **emerging Gulf of Guinea bribery corridor** alert **19 days before formal reporting** (Lagos port-risk 71 → 84).

## Design language — "Deep Current" (light institutional SaaS)
Distinct from prior demos (no navy+gold, no dark control-room). Clean, trustworthy governance SaaS.
- **Palette:** deep **maritime ink** (#0E2E38) structure/brand on cool off-white (#F7F9FA) · single **teal-green “current”** accent (#0FB5A6) = AI / Lodestar / sanitized-safe · **risk-amber** (#CE7519) = corruption-risk emphasis. Green/amber/red reserved STRICTLY for status (clear / watch / high-risk).
- **Type:** Bricolage Grotesque (display) · Inter (UI) · JetBrains Mono (case IDs, port codes, figures).
- **Signature motifs:** **redaction bars** (raw identifiers blacked out → sanitized), **maritime cartography** (port nodes sized by risk + animated corridor arcs), **sonar risk pulses** on hotspot ports.
- Token keys kept as `steel`/`azure`/`cyan`/`gold`/`amber` (+ navy/sky/volt aliases) so shared shadcn + blueprint primitives stay wired; only VALUES remapped (see `tailwind.config.js`).

## Screens (8; build one-per-turn)
1. **Intelligence Command Center** ✅ — KPIs, Lodestar digest, global risk map (Gulf of Guinea sonar cluster + corridor arc), early-warning alerts, live sanitizing intake feed, intake trend, port-risk leaderboard
2. **Incident Intelligence View** (scaffold) — unified structured + narrative “Incident Intelligence Object,” Salesforce-enriched
3. **AI Anonymization & Redaction Engine** (scaffold) — HERO; upload → classify → redact/abstract → raw vault vs sanitized + explainability log
4. **Pattern Detection & Risk Intelligence** (scaffold) — clustering, corridor detection, port/route/actor risk scoring, predictive early warning
5. **Confidentiality Vault & Tiered Access** (scaffold) — same incident seen by analyst / member / external; RBAC, encryption, access logs
6. **Audit & Data Lineage** (scaffold) — source → anonymization → AI → output trail; compliance export
7. **Member Insight Portal** (scaffold) — safe member-facing regional risk maps, anonymized trends, mitigation insights
8. **Lodestar Copilot & Decision Audit** (scaffold) — NL Q&A over the sanitized layer + traceable rationale

## Pilot data scale
10,000 structured Salesforce incidents · 5,000 qualitative reports · 1,000 anonymized high-risk cases · 50 ports · 20 corridors · 30 member orgs · 5-year history.

## Stack
Vite + React 19 + TS + Tailwind + shadcn-style ui + recharts + lucide. `npm run dev` (auto-picks port). `node_modules` symlinked to the Roundstone scaffold (identical deps). Managed Chrome blocks localhost — screenshot via headless system Chrome.
