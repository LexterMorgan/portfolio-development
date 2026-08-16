---
slug: folu-executive-intelligence
title: "FOLU Executive Intelligence Dashboard"
subtitle: "Public discourse, sentiment & communication risk"
category: "Communication Intelligence / Executive Analytics"
status: completed
featured: true
order: 3
year: 2025
description: "Communication intelligence for FOLU Net Sink 2030 — sentiment, campaigns, platforms, and risk, with synthetic enrichment disclosed."
tech_stack:
  data:
    - python
    - pandas
    - numpy
  frontend:
    - nextjs
    - react
    - typescript
  bi:
    - recharts
  deployment:
    - vercel
links:
  live: "https://folu-executive-dashboard.vercel.app/"
  github: "https://github.com/LexterMorgan/folu-executive-dashboard"
  explore: "/projects/folu-executive-intelligence"
hero: "/projects/folu-executive-intelligence/preview.png"
thumbnail: "/projects/folu-executive-intelligence/preview.png"
five_w1h:
  what: "A communication-intelligence dashboard that monitors public discourse around FOLU Net Sink 2030 across overview, campaign, sentiment, risk, trend, and platform views."
  why: "Public conversation around FOLU Net Sink 2030 needs structured monitoring so communication and executive stakeholders can see sentiment shifts, campaign signals, platform patterns, and emerging risk — without treating the shipped payload as a pure observational census."
  who: "Communication and executive stakeholders monitoring FOLU Net Sink 2030 discourse."
  how: "External CSVs → process_data.py → dashboard_data.json → Next.js App Router dashboard (React, TypeScript, Recharts). Routes include Overview, Campaign, Sentiment, Risk, Trend, and Platform."
findings:
  - summary: "Shipped analytical payload contains 411 total records (316 original + 95 synthetic)."
    evidence: observed
    source: "FOLU dashboard payload / project materials"
    metric: "411"
    label: "Records in shipped payload"
  - summary: "Original records in the shipped payload: 316."
    evidence: observed
    source: "FOLU dashboard payload / project materials"
    metric: "316"
    label: "Original records"
  - summary: "Synthetic enrichment records in the shipped payload: 95 (approximately 30% synthetic target)."
    evidence: observed
    source: "FOLU project materials"
    metric: "95"
    label: "Synthetic records"
  - summary: "Platform coverage in the shipped payload: TikTok 247, YouTube 86, Instagram 60, Website/Media 18."
    evidence: observed
    source: "FOLU dashboard payload / project materials"
  - summary: "Sentiment classes in the shipped payload: Neutral 303, Positive 77, Negative 31."
    evidence: observed
    source: "FOLU dashboard payload / project materials"
limitations:
  - "The shipped dashboard artifact includes approximately 30% synthetic enrichment. Dashboard aggregates should therefore be interpreted as a constructed analytical dataset rather than a direct measurement of observed public activity."
  - "Raw source CSVs are not bundled in this repository archive; the processing script references an external data path."
  - "Claims stay within repository-documented scope for communication/social datasets packaged with the project."
articles: []
---

Focused on public discourse intelligence — sentiment, campaigns, platforms, and communication risk — with synthetic enrichment disclosed in methodology and limitations rather than hidden.
