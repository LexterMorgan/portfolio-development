# Michael Alexander — Portfolio

[![Live site](https://img.shields.io/badge/Live%20site-michaelalexander.vercel.app-0ea5b7?style=flat-square&logo=vercel&logoColor=white)](https://michaelalexander.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Michael%20Alexander-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/michaelaxander/)
[![GitHub](https://img.shields.io/badge/GitHub-LexterMorgan-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/LexterMorgan)

![Portfolio preview](public/og-image.png)

An editorial portfolio for a **Data Science Graduate | Business Intelligence & Data Analyst**.

The site presents projects as structured case studies covering problem framing, methodology, evidence, findings, limitations, and implementation.

## Current status

**Phase 3 — Real content and visual fill**

The content-driven foundation and design system are in place. Current work focuses on refining the frontend around verified profile information, project evidence, screenshots, and case-study substance.

## Selected work

| Project | Focus | Live demo | Source |
|---|---|---|---|
| [Customer Retention Intelligence](content/projects/customer-retention/project.md) | Customer risk segmentation and retention prioritization | [Open dashboard](https://customer-retention-intelligence.vercel.app/) | [GitHub](https://github.com/LexterMorgan/customer-retention-intelligence) |
| [E-Commerce Power Shift](content/projects/ecommerce-power-shift/project.md) | Evidence-driven Shopee vs Tokopedia analysis | [Open dashboard](https://ecommerce-power-shift.vercel.app/) | [GitHub](https://github.com/LexterMorgan/ecommerce-power-shift) |
| [FOLU Executive Intelligence](content/projects/folu-executive-intelligence/project.md) | Public discourse, sentiment, and communication risk | [Open dashboard](https://folu-executive-dashboard.vercel.app/) | [GitHub](https://github.com/LexterMorgan/folu-executive-dashboard) |
| [RetailIQ](content/projects/retailiq/project.md) | Commercial BI and multidimensional retail analytics | [Open dashboard](https://retailiq-executive-dashboard.vercel.app/) | [GitHub](https://github.com/LexterMorgan/retailiq-executive-dashboard) |

## Built with

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zod](https://img.shields.io/badge/Zod-schema%20validation-3e67b1?style=flat-square)](https://zod.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-testing-6e9f18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)

- Next.js App Router
- React and TypeScript
- Markdown/frontmatter content
- Zod schemas and content loaders
- CSS design tokens and component-level styles
- `react-markdown`
- Vitest

## Content architecture

Portfolio content is separated from the presentation layer.

```text
content/
├── profile.md
├── experience.md
├── education.md
├── skills.md
├── currently.md
└── projects/
    └── <project>/project.md
```

Project metadata controls:

- Project status
- Featured work
- Display order
- Technology stacks
- Live and GitHub links
- Case-study sections
- Evidence labels
- Findings
- Limitations

The UI reads from these content files instead of hardcoding portfolio facts inside React components.

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage and positioning |
| `/projects` | Selected work index |
| `/projects/[slug]` | Full project case study |
| `/articles` | Insights index |
| `/articles/[slug]` | Article detail |
| `/about` | Background, experience, and capabilities |
| `/contact` | Contact page |

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run typecheck
npm run lint
npm run test
npm run validate:content
npm run build
```

## Content integrity

This portfolio is intentionally evidence-first.

- Personal information must come from verified source material.
- Project technologies must be verified against their repositories.
- Unknown values remain unknown.
- Analytical limitations stay visible.
- Metrics must not be presented as audited business outcomes unless supported by source material.
- No fabricated employers, achievements, results, or project claims.

See:

- [`AGENTS.md`](AGENTS.md)
- [`docs/PRD.md`](docs/PRD.md)
- [`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)
- [`docs/WORKFLOW.md`](docs/WORKFLOW.md)
- [`docs/TODO.md`](docs/TODO.md)

## Scope

This is a content-driven portfolio, not a CMS or database product.

New projects and articles are added as content files, validated through the content loader, and rendered through reusable presentation components.

Git commits, pushes, and deployment remain human-controlled.
