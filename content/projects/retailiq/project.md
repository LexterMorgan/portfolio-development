---
slug: retailiq
title: "RetailIQ"
subtitle: "Commercial BI systems & multidimensional retail analytics"
category: "Business Intelligence / Retail Analytics"
status: completed
featured: true
order: 4
year: 2025
description: "Commercial retail BI: ETL from transactional CSVs into PostgreSQL, then dimensional reporting across revenue, customers, products, stores, and geography."
tech_stack:
  data:
    - python
    - pandas
  database:
    - sql
    - postgresql
  frontend:
    - react
    - typescript
    - vite
  backend:
    - express
  bi:
    - recharts
  deployment:
    - vercel
links:
  live: "https://retailiq-executive-dashboard.vercel.app/"
  github: "https://github.com/LexterMorgan/retailiq-executive-dashboard"
  explore: "/projects/retailiq"
hero: "/projects/retailiq/preview.png"
thumbnail: "/projects/retailiq/preview.png"
five_w1h:
  what: "A commercial BI workflow that consolidates retail transactions across products, customers, stores, geography, and time into management reporting views covering revenue, orders, customers, average order value, trends, rankings, and dimensional filters."
  why: "Fragmented transactional extracts make it hard to answer basic commercial questions from one consistent analytical surface."
  who: "Analytics and management audiences reviewing retail performance across markets, stores, and categories."
  how: "CSV → Pandas ETL → PostgreSQL → SQL views → Express API → React/Vite dashboard. The public portfolio deployment also supports a static path (PostgreSQL export → JSON → React/Vercel) and should be treated as snapshot-driven rather than a live company database."
findings:
  - summary: "Project dataset total revenue is $55,755,479.59."
    evidence: derived
    source: "RetailIQ repository README — Key Metrics table"
    metric: "$55.76M"
    label: "Dataset revenue"
  - summary: "Project dataset contains 26,326 total orders."
    evidence: derived
    source: "RetailIQ repository README — Key Metrics table"
    metric: "26,326"
    label: "Orders (dataset snapshot)"
  - summary: "Project dataset contains 11,887 total customers."
    evidence: derived
    source: "RetailIQ repository README — Key Metrics table"
    metric: "11,887"
    label: "Customers (dataset snapshot)"
  - summary: "Average order value in the project dataset is $2,117.89."
    evidence: derived
    source: "RetailIQ repository README — Key Metrics table"
    metric: "$2,117.89"
    label: "Average order value (dataset)"
limitations:
  - "KPI figures are derived from the project's analytical dataset — not external audited company financials."
  - "Public demo uses static snapshots; it is not a real-time or live-database querying experience."
  - "Year-over-year performance should not be overclaimed from the overall snapshot where trend comparison fields contain zero values."
articles: []
---

RetailIQ is positioned as commercial BI infrastructure: ETL into a structured analytical layer, then multidimensional reporting across revenue, customers, products, stores, and geography.
