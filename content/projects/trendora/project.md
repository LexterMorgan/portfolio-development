---
slug: trendora
title: "Trendora"
subtitle: "Local-first research workspace with citation-traced findings"
category: "Research tooling / Retrieval"
status: in-progress
featured: false
order: 6
year: 2026
description: "A research-first workspace for collecting YouTube and public-web sources, reading citation-traced findings, and comparing saved reports. FastAPI backend, Next.js client, optional AI synthesis."
tech_stack:
  data:
    - python
  backend:
    - fastapi
  database:
    - postgresql
  frontend:
    - nextjs
    - react
links:
  github: "https://github.com/LexterMorgan/trendora"
five_w1h:
  what: "A workspace that builds one topic-and-window report from configured sources, attributes each finding to supplied source text, and keeps limits visible."
  why: "Search results are fragmented, often undated, and easy to over-read; without a record of which source supports each sentence, a report is hard to defend."
  who: "One person doing marketing or research work, plus a small shared workflow — explicitly not company-wide content management."
  how: "Topic plus timeframe drives collection from configured sources. Findings must cite supplied source text; citations are structural and do not prove a statement true. Saving, reading, and reopening require no model call; optional generation of gaps, opportunities, ideas, and briefs is a bounded operation that leaves research intact on failure."
limitations:
  - "Alpha v0.1 with no public deployment; described behaviour is from the repository documentation, not a live product."
  - "AI prose quality is unverified in the repo’s own documentation."
  - "Public-web items are indexed titles and snippets, not fetched full pages; YouTube evidence is source metadata rather than transcripts or media analysis."
articles: []
---

Trendora is an attempt to make research defensible before writing starts. For a single topic and a fixed window, it collects material from configured sources and produces findings that point back to the supplied text — so every statement has a traceable origin, and the limits of the source set stay visible.

It is deliberately not a content machine. Reading, saving, and reopening a report never requires a model call. On-demand generation of gaps, opportunities, ideas, and briefs is bounded, optional, and never publishes automatically. The repository is explicit about what it does not yet prove: there is no public deployment, and AI prose quality is unverified.
