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
| Background | Near-black navy `#070B12` with cyan ambient glow |
| Foreground | Off-white `#EEF3F7` |
| Accent | Restrained cyan/teal `#3DB8C5` |
| Secondary accent | Soft violet for portrait easter-egg only |
| Display type | Newsreader |
| Body type | Source Sans 3 |
| Mono / meta | IBM Plex Mono |

Hero portrait: professional default with cut-out integration; Gojo revealed on desktop hover / mobile tap. Alignment reference composite is **not** rendered as the hero.

Avoided: purple SaaS gradients, glassmorphism, oversized rounded cards, skill bars, glow-everywhere UI, anime-themed chrome outside the portrait easter egg.

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
