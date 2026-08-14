# Portfolio Development

Personal portfolio — **Data Science Graduate | Data Analytics | Business Intelligence**.

Editorial work-journal positioning. Content is separated from presentation.

## Phase status

**Phase 2 — Design system & frontend UI** (current complete for UI foundation).

Next: populate verified content, screenshots, and case-study substance (Phase 3+). See `docs/WORKFLOW.md` and `docs/DESIGN_SYSTEM.md`.

## Stack

- Next.js (App Router) + TypeScript
- File-based Markdown/frontmatter content under `content/`
- Zod schemas + loaders in `src/content/`
- CSS design tokens + component modules
- `react-markdown` for content bodies
- Vitest for loader/schema validation

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home |
| `/projects` | Work index |
| `/projects/[slug]` | Case study |
| `/articles` | Insights index |
| `/articles/[slug]` | Article |
| `/about` | About |

## Documentation

| Doc | Purpose |
|-----|---------|
| `AGENTS.md` | Repository-wide agent rules |
| `docs/PRD.md` | Product requirements |
| `docs/ARCHITECTURE.md` | Content/presentation architecture |
| `docs/DESIGN_SYSTEM.md` | Visual system & UI architecture |
| `docs/WORKFLOW.md` | Phased delivery plan |
| `docs/DATA_SOURCES.md` | Legitimate source material |
| `docs/RESEARCH_METHOD.md` | Analytical integrity rules |
| `docs/TODO.md` | Practical roadmap |

## Development

```bash
npm install
npm run dev
```

### Validation

```bash
npm run typecheck
npm run lint
npm run test
npm run validate:content
npm run build
```

## Content

Add or edit files under `content/`. Do not invent portfolio facts — see `docs/DATA_SOURCES.md` and `AGENTS.md`.

## Git / deploy

Human-controlled. Agents must not commit or push unless explicitly instructed.
