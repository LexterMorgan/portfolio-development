# Portfolio Development

Personal portfolio — **Data Science Graduate | Data Analytics | Business Intelligence**.

Editorial work-journal positioning. Content is separated from presentation.

## Phase status

**Phase 1 — Foundation & content architecture** (current).

Visual design, homepage UI, and deployment are intentionally out of scope until later phases. See `docs/WORKFLOW.md`.

## Stack

- Next.js (App Router) + TypeScript
- File-based Markdown/frontmatter content under `content/`
- Zod schemas + loaders in `src/content/`
- Vitest for loader/schema validation

## Documentation

| Doc | Purpose |
|-----|---------|
| `AGENTS.md` | Repository-wide agent rules |
| `docs/PRD.md` | Product requirements |
| `docs/ARCHITECTURE.md` | Content/presentation architecture |
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
