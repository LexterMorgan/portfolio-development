# Architecture

## Core principle

**Content is separated from presentation.**

```
Markdown / frontmatter
        ↓
Content parser / loader
        ↓
Typed content models (Zod)
        ↓
Reusable components (later phases)
        ↓
Pages
        ↓
Static / deployed website (Vercel)
```

## Stack (Phase 1)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js (App Router) | Static-friendly, Vercel-native, TypeScript-first |
| Language | TypeScript (strict) | Typed content models |
| Content | Markdown + YAML frontmatter under `content/` | No CMS/DB for V1 |
| Validation | Zod | Fail clearly on malformed content |
| Tests | Vitest | Loader / schema verification |
| Hosting target | Vercel (static/SSG) | Human-controlled deploy in Phase 10 |

The repository was empty at Phase 1 start (git only). Next.js was chosen as the minimal deployable foundation — not a stack migration.

## Content domains

| Domain | Location | Notes |
|--------|----------|-------|
| Profile | `content/profile.md` | Positioning, identity — no invented bio |
| Experience | `content/experience.md` | Entries only when sourced |
| Education | `content/education.md` | Entries only when sourced |
| Skills | `content/skills.md` | Technologies as IDs, not percentages |
| Site | `content/site.md` | Site-level metadata / nav labels |
| Projects | `content/projects/<slug>/project.md` | Case study + metadata |
| Articles | `content/projects/<slug>/articles/*.md` | Linked via project slug |
| Updates | `content/updates/*.md` | Changelog-style entries |
| Currently | `content/currently.md` | Editable focus without code changes |

## Project relationship model

```
Project (slug)
├── Explore / case study  → /projects/[slug]
├── Live deployment       → links.live (optional)
├── GitHub repository     → links.github (optional)
└── Articles / Insights   → articles with frontmatter.project = slug
```

Relationships use **stable slugs/IDs**, never hardcoded page imports.

## Technology icon registry

Projects reference canonical technology IDs (`python`, `postgresql`, `react`).

Registry (`src/content/tech-registry.ts`) stores:

- canonical ID
- display name
- category
- icon asset path (future)
- optional description / color metadata

UI (later) renders logo + name + optional role/context. Phase 1 defines the registry architecture only — no visual treatment.

## Project status system

```ts
type ProjectStatus = "idea" | "planned" | "in-progress" | "completed" | "archived";
```

Plus `featured: boolean` for homepage selection (Phase 3).

Derived sections (future UI):

| Section | Rule (conceptual) |
|---------|-------------------|
| Selected Work | `featured === true` and typically `completed` |
| Currently Building | `status === "in-progress"` (and/or `planned`) |
| Archived Work | `status === "archived"` |

## Extensibility

- Add a project: create `content/projects/<slug>/project.md` (+ optional articles).
- Add an article: create markdown under the project’s `articles/` with `project: <slug>`.
- Update “Currently”: edit `content/currently.md`.
- No main UI rewrite required for content additions.

## Loading strategy

- File-system reads at build / request (Node runtime).
- Gray-matter for frontmatter + body.
- Zod schemas for validation.
- Deterministic sorting (date, featured, slug).
- Malformed content fails with clear errors (`npm run validate:content`).

## Non-architecture (intentionally absent in V1)

- Database / headless CMS
- Auth
- Client-side content fetching for portfolio data
- Auto-generated metrics from analytics APIs
