# Design System

Phase 2 visual and UI foundation for the portfolio.

## Principles

1. **Content readability** over decoration
2. **Professional credibility** for data / BI audiences
3. **Analytical positioning** — case studies, not coding cards
4. **Visual uniqueness** without template aesthetics
5. **Accessibility** and keyboard use
6. **Performance** — Server Components, CSS motion, minimal client JS

Motif: **DATA + EDITORIAL + PRODUCT + PERSONAL BRAND**

## Visual identity

| Token idea | Choice |
|------------|--------|
| Background | Cool paper `#F3F5F4` with subtle grid veil |
| Foreground | Deep ink `#141816` |
| Accent | Teal `#0D5C63` (single recognizable accent) |
| Display type | Newsreader |
| Body type | Source Sans 3 |
| Mono / meta | IBM Plex Mono |

Avoided: purple gradients, glassmorphism, oversized rounded SaaS cards, skill bars, glow effects, generic centered card grids.

Identity signals: editorial labels, project numbering, technical metadata, framed previews (or intentional “visual pending” fallbacks), restrained borders, controlled asymmetry on the homepage.

## Typography scale

Defined in `src/styles/tokens.css`:

- display / hero
- page heading
- section heading
- titles
- body
- metadata / labels
- code

## Color tokens

`--color-bg`, `--color-fg`, `--color-fg-muted`, `--color-border`, `--color-accent`, `--color-surface`, `--color-success|warning|danger`, `--color-focus`, etc.

## Spacing & layout

Spacing scale `--space-1` … `--space-10`.

Containers:

- `narrow` — contact / 404
- `reading` — articles / case-study prose
- `content` — default
- `wide` — homepage / project index

## Component architecture

```
src/components/
  layout/        Container, Section, SectionHeading, Breadcrumb, Divider
  navigation/    SiteHeader, SiteFooter
  ui/            Button, TextLink, Label, EmptyState, StatusBadge
  tech/          TechBadge, TechStackList
  projects/      Card, Featured, Grid, Meta, Links, Preview, 5W1H, Findings, Artifacts
  articles/      ArticleCard
  experience/    ExperienceItem
  sections/      Hero, Capabilities, Currently, Updates
  typography/    Prose
```

## Project composition

Explore (primary) · Live · GitHub (only when URLs exist).

Featured vs building vs archived derived from `featured` + `status` in content — never fabricated.

## Technology icons

Registry in `src/content/tech-registry.ts`. UI resolves icons from `public/icons/tech/` with monogram fallback if a file is missing. Projects must not invent stack IDs.

## Artifacts

`ArtifactBlock` / `ArtifactGallery` support dashboard, chart, table, code, diagrams, etc. No fake artifacts are seeded.

## Motion

CSS-only reveals and hover arrow shifts. Honors `prefers-reduced-motion`.

## Accessibility

Semantic landmarks, focus-visible rings, accessible mobile nav, alt text on images, empty states instead of broken UI.

## Search (deferred UI)

`src/lib/search.ts` defines a lightweight index shape for a future Cmd/Ctrl+K interface.

## SEO

`src/lib/metadata.ts` builds root + page Open Graph / Twitter metadata and favicon.
