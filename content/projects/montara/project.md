---
slug: montara
title: "Montara"
subtitle: "Local-first spending tracker for period comparisons"
category: "Data product / Personal finance"
status: completed
featured: true
order: 5
year: 2026
description: "A local-first spending tracker: record expenses, compare periods, and see where money moved. Works with no account; optional Supabase sync for cross-device use."
tech_stack:
  frontend:
    - nextjs
    - react
    - typescript
  database:
    - supabase
  deployment:
    - vercel
hero: "/projects/montara/preview.png"
thumbnail: "/projects/montara/preview.png"
links:
  live: "https://montara-9on.pages.dev"
  github: "https://github.com/LexterMorgan/montara"
five_w1h:
  what: "A personal spending tracker built around comparison rather than raw logging: record expenses, compare periods, and surface where spending moved."
  why: "Most trackers optimise for entry and leave the comparison work to the user. The interesting question is what changed between periods, not the individual transaction."
  who: "One person tracking their own spending on their own device, with an optional signed-in mode for cross-device continuity."
  how: "Next.js + TypeScript client. Expenses persist to localStorage by default; an optional signed-in mode uses Supabase Postgres as the source of truth, with writes confirmed only after Supabase succeeds. Preferences stay local in both modes."
limitations:
  - "Personal project without real user data; no claims about behaviour, retention, or savings impact."
  - "Signed-in sync is optional and depends on configured Supabase credentials; without them the app runs in local-only mode."
  - "The pricing experiment described in the repo is a hypothesis, not an outcome."
articles: []
---

Montara is a spending tracker aimed at a narrower question than most finance apps: not “what did I spend”, but “what changed”. Expenses are recorded quickly, then read back through period comparisons that show where the money moved.

The product is local-first by design. Signed out, data lives in `localStorage` on that device with no account and no network. Signed in, Supabase Postgres becomes the source of truth: writes are confirmed only after Supabase succeeds, failures keep the previous form state, and sign-out clears synced data from the device while preferences stay local.
