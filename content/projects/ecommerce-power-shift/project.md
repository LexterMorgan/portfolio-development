---
slug: ecommerce-power-shift
title: "E-Commerce Power Shift"
subtitle: "Shopee vs Tokopedia in Indonesia — evidence-driven competitive analysis"
category: "Market Intelligence / Competitive Analysis"
status: completed
featured: true
order: 2
year: 2025
description: "Structural-break competitive analysis of Shopee versus Tokopedia-related entities in Indonesia — unknowns labeled, not filled in."
tech_stack:
  data:
    - python
    - pandas
    - numpy
    - matplotlib
  database:
    - sql
    - postgresql
    - sqlalchemy
  frontend:
    - react
    - typescript
    - vite
  bi:
    - recharts
  deployment:
    - vercel
links:
  live: "https://ecommerce-power-shift.vercel.app/"
  github: "https://github.com/LexterMorgan/ecommerce-power-shift"
  explore: "/projects/ecommerce-power-shift"
hero: "/projects/ecommerce-power-shift/preview.jpg"
thumbnail: "/projects/ecommerce-power-shift/preview.jpg"
five_w1h:
  what: "A competitive market-position study of Shopee vs Tokopedia-related entities in Indonesia around the 2024–2025 structural market shift, with explicit handling of standalone vs combined entity structures."
  why: "Tokopedia and TikTok Shop-related entities cannot be treated as one continuous historical series without accounting for the structural break. Strategy work needs transparent evidence labels — including unknowns — rather than a flattened win/loss narrative."
  who: "Strategy and commercial teams evaluating Indonesia e-commerce competitive dynamics."
  when: "2022–2024 standalone entities; 2025 combined structure."
  where: "Indonesia e-commerce landscape (Shopee, Tokopedia, TikTok Shop combination context)."
  how: "Sources → Python preparation/validation → analysis-ready panel → PostgreSQL/SQL → validated export → static JSON → React → Vercel. Evidence labels: OBSERVED, DERIVED, UNKNOWN, SCENARIO. UNKNOWN values are not plotted as zero; scenario bands are illustrative, not forecasts."
findings:
  - summary: "2022 (project analysis summary): Shopee 36%; Tokopedia-related legacy 35%."
    evidence: derived
    source: "E-Commerce Power Shift analysis summary"
    metric: "36% → 46% → 54%"
    label: "Shopee share across selected periods"
  - summary: "2024 (project analysis summary): Shopee 46%; Tokopedia-related legacy 23%."
    evidence: derived
    source: "E-Commerce Power Shift analysis summary"
  - summary: "2025 (project analysis summary): Shopee 54%; Tokopedia-related combined 38%. Legacy Tokopedia 2025 standalone share remains UNKNOWN."
    evidence: derived
    source: "E-Commerce Power Shift analysis summary"
  - summary: "Structural-break methodology separates 2022–2024 standalone comparison from 2025 combined-entity comparison; scenario bands are labeled as scenarios, not forecasts."
    evidence: observed
    source: "Project methodology documentation"
limitations:
  - "Legacy Tokopedia 2025 standalone share is treated as UNKNOWN where unsupported — unknowns are not coerced to zero."
  - "Scenario gap bands are illustrative scenario values, not forecasts-as-fact."
  - "Share figures retain structural-break context; they should not be flattened into a simplistic 'Shopee beat Tokopedia' claim."
  - "Public dashboard presents validated historical analytical exports rather than live transactional monitoring."
articles: []
---

Differentiator is research discipline: structural-break reasoning, evidence classification, and transparent uncertainty — not another generic dashboard template.
