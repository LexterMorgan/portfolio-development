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
Reusable components
        ↓
Pages
        ↓
Static / deployed website (Vercel)
```

## Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js (App Router) | Static-friendly, Vercel-native, TypeScript-first |
| Language | TypeScript (strict) | Typed content models |
| Content | Markdown + YAML frontmatter under `content/` | No CMS/DB for V1 |
| Validation | Zod | Fail clearly on malformed content |
| Markdown UI | `react-markdown` | Render content bodies without a CMS |
| Tests | Vitest | Loader / schema verification |
| Hosting target | Vercel (static/SSG) | Human-controlled deploy in Phase 10 |

## Frontend (Phase 2)

| Area | Location |
|------|----------|
| Design tokens | `src/styles/tokens.css` |
| Design docs | `docs/DESIGN_SYSTEM.md` |
| Components | `src/components/**` |
| Routes | `src/app/**` |
| Metadata helpers | `src/lib/metadata.ts` |
| Search index shape | `src/lib/search.ts` (UI deferred) |

### Routes

| Path | Purpose |
|------|---------|
| `/` | Homepage composition |
| `/projects` | Project index |
| `/projects/[slug]` | Explore / case study |
| `/articles` | Published articles index |
| `/articles/[slug]` | Article detail |
| `/about` | Profile, experience, education, skills, currently |

## Content domains

| Domain | Location | Notes |
|--------|----------|-------|
| Profile | `content/profile.md` | Positioning, identity — no invented bio |
| Experience | `content/experience.md` | `layer: primary \| additional` |
| Education | `content/education.md` | Entries only when sourced |
| Skills | `content/skills.md` | Technologies as IDs, not percentages |
| Site | `content/site.md` | Site-level metadata |
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
                           → /articles/[article-slug]
```

Relationships use **stable slugs/IDs**, never hardcoded page imports.

## Technology icon registry

Projects reference canonical technology IDs (`python`, `postgresql`, `react`).

Registry (`src/content/tech-registry.ts`) + UI (`TechBadge` / `TechStackList`):

- canonical ID, display name, category
- icon under `public/icons/tech/` when present
- monogram fallback when asset missing

## Project status system

```ts
type ProjectStatus = "idea" | "planned" | "in-progress" | "completed" | "archived";
```

Plus `featured: boolean`.

| Section | Rule |
|---------|------|
| Selected Work | `featured === true` |
| Currently Building | `status === "in-progress"` or `"planned"` |
| Completed | `status === "completed"` |
| Archived | `status === "archived"` |

## Extensibility

- Add a project: create `content/projects/<slug>/project.md` (+ optional articles).
- Add an article: markdown under the project’s `articles/` with `project: <slug>`.
- Update “Currently”: edit `content/currently.md`.
- No main UI rewrite required for content additions.

## Loading strategy

- File-system reads at build / request (Node runtime).
- Gray-matter for frontmatter + body.
- Zod schemas for validation.
- Deterministic sorting (date, featured, slug).
- Malformed content fails with clear errors (`npm run validate:content`).

## Non-architecture (intentionally absent)

- Database / headless CMS
- Auth
- Analytics/tracking (readiness only)
- Client-side content fetching for portfolio data
- Heavy search UI (index shape prepared)
