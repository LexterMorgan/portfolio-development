---
slug: customer-retention
title: "Customer Retention Intelligence"
subtitle: "Customer risk segmentation & retention prioritization"
category: "Customer Analytics / Retention"
status: completed
featured: true
order: 1
year: 2025
description: "Customer risk segmentation and retention prioritization — who is leaving, where churn concentrates, and which segments to investigate first."
tech_stack:
  data:
    - python
    - pandas
  database:
    - sql
    - sqlite
  frontend:
    - react
    - typescript
    - vite
  bi:
    - recharts
  deployment:
    - vercel
links:
  live: "https://customer-retention-intelligence.vercel.app/"
  github: "https://github.com/LexterMorgan/customer-retention-intelligence"
  explore: "/projects/customer-retention"
hero: "/projects/customer-retention/preview.png"
thumbnail: "/projects/customer-retention/preview.png"
five_w1h:
  what: "A subscription/telecom churn analytics workflow that investigates where churn concentrates across contract patterns, tenure, internet service, offers, billing, demographics, and stated churn reasons — then surfaces rule-based risk tiers and segments for retention investigation."
  why: "An overall churn percentage alone does not tell retention teams which customers to prioritize. The analytical question is who is leaving, where risk concentrates, and which segments deserve investigation first."
  who: "Retention and analytics teams working with subscription / telecom-style customer data."
  when: "Dataset snapshot: Q2 2022 California telecom (one row per customer)."
  where: "California telecom customer base represented in the project dataset."
  how: "Raw CSV → Python cleaning → EDA/SQL analysis → SQLite → dashboard_payload.json → React/TypeScript/Vite dashboard. The public frontend is JSON/snapshot-driven rather than a live database API."
findings:
  - summary: "In the analyzed dataset, overall churn rate is 28.37% (1,869 churned of 6,589 rate-base customers from 7,043 raw customer rows)."
    evidence: observed
    source: "Customer Retention Intelligence repository analysis outputs"
    metric: "28.37%"
    label: "Churn rate in analyzed dataset"
  - summary: "Month-to-Month customers show approximately 51.7% churn and represent approximately 88.6% of churn volume in the project dataset."
    evidence: derived
    source: "Project SQL analysis / documented findings"
    metric: "51.7%"
    label: "Month-to-month churn (dataset)"
  - summary: "Customers with 0–6 month tenure show approximately 77.2% churn in the project dataset."
    evidence: derived
    source: "Project SQL analysis / documented findings"
    metric: "77.2%"
    label: "Churn among 0–6 month tenure"
  - summary: "Fiber Optic customers show elevated churn relative to other internet-service groups in the project dataset."
    evidence: derived
    source: "Project SQL analysis / documented findings"
  - summary: "Competitor-related reasons account for approximately 45% of churned customers according to the project's documented findings."
    evidence: derived
    source: "Project documented findings"
  - summary: "Dataset retention rate is 71.63%; MRVL analytical construct is $137,086.65 in the project materials."
    evidence: derived
    source: "Project analysis outputs"
limitations:
  - "Analysis is descriptive and associational — not a predictive churn model. Risk tiers are rule-based, not machine-learning predictions."
  - "MRVL and scenario components are analytical constructs, not causal impact estimates."
  - "Findings describe this project dataset (Q2 2022 California telecom snapshot) and do not claim industry-wide telecom rates."
  - "Public dashboard is driven by a pre-generated JSON payload, not live database querying."
articles: []
---

Built around customer risk and retention prioritization: where churn concentrates, which characteristics associate with higher risk, and which segments deserve investigation first — without treating the work as a predictive scoring product.
