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
| Background | Near-black navy `#070B12` with restrained cyan ambient light |
| Foreground | Off-white `#EEF3F7` |
| Accent | Restrained cyan/teal `#3DB8C5` |
| Display type | Newsreader |
| Body type | Source Sans 3 |
| Mono / meta | IBM Plex Mono |

Identity remains navy + cyan. Syfrsam is a quality reference only — not layout or brand cloning.

Avoided: purple SaaS gradients, heavy glassmorphism, skill bars, neon overload, fake metrics, custom cursors, giant shadows.

## Color tokens

Defined in `src/styles/tokens.css`.

### Surfaces

- `--color-bg` / `--color-background` — page base `#070B12`
- `--color-bg-subtle` / `--color-background-subtle`
- `--color-surface` · `--color-surface-hover` · `--color-surface-elevated`

### Text

- `--color-fg` / `--color-text-primary`
- `--color-fg-muted` / `--color-text-secondary`
- `--color-fg-subtle` / `--color-text-muted`
- `--color-fg-disabled` / `--color-text-disabled`

### Accent & borders

- `--color-accent` · `--color-accent-hover` · `--color-accent-subtle`
- `--color-border` · `--color-border-subtle` · `--color-border-strong` · `--color-border-accent`

### Status

- `--color-success` · `--color-warning` · `--color-danger` / `--color-error`
- `--color-focus`

Legacy names (`--color-fg`, `--color-bg`, `--color-danger`, etc.) remain for existing modules.

## Typography scale

Responsive via `clamp` where needed:

| Token | Use |
|-------|-----|
| `--text-display` | Hero display |
| `--text-page` | Page heading |
| `--text-section` | Section heading |
| `--text-subheading` | Subheading |
| `--text-body-lg` / `--text-body` / `--text-small` | Body levels |
| `--text-meta` | Metadata |
| `--text-label` | Technical / section labels |

Newsreader → editorial headings · Source Sans 3 → UI/body · IBM Plex Mono → metadata only.

## Spacing & layout

Spacing scale `--space-1` … `--space-10`.

Containers (`Container` width prop):

- `narrow` — contact / 404
- `reading` — articles / case-study prose
- `content` — default
- `wide` — homepage / project index

Gutter: `--gutter` (desktop) · `--gutter-sm` (mobile).

Grid utilities in `globals.css`: `.grid-2`, `.grid-3`, `.grid-asymmetric` (stack below 900px).

## Motion

| Token | Intent |
|-------|--------|
| `--duration-micro` (~180ms) | Micro interactions |
| `--duration-fast` (~200ms) | Fast UI |
| `--duration-base` (~320ms) | Normal UI |
| `--duration-slow` / `--duration-reveal` | Content reveal |
| `--duration-editorial` (~900ms) | Large editorial |

`prefers-reduced-motion: reduce` zeroes token durations and disables decorative transforms in Reveal / hover states.

Primitives: **Reveal**, **Marquee**, CSS transitions only. No Motion / GSAP / React Bits yet.

## Component architecture

```
src/components/
  layout/        Container, Section, SectionHeading, SectionLabel, Breadcrumb, Divider
  navigation/    SiteHeader, SiteFooter
  ui/            Button, TextLink, Label, EmptyState, StatusBadge, Card, Reveal, Marquee
  tech/          TechBadge, TechStackList
  projects/      Card, Featured, Grid, Meta, Links, Preview, 5W1H, Findings, Artifacts
  articles/      ArticleCard
  experience/    ExperienceItem
  sections/      Hero, Capabilities, Currently, Updates, …
  typography/    Prose
```

### SectionLabel

Reusable editorial label: `01 / SELECTED WORK`. Cyan index, muted mono label. Accepts `index` + `label`, or a parseable `children` / eyebrow string.

### Card

Foundation tones: `default` | `hover` | `active` | `featured`. Distinguishes via border + surface, not heavy shadow.

### Button

`primary` · `secondary` · `ghost` · `text` — hover / focus / active / disabled. Optional arrow shift.

### Preview

`ProjectPreview`: responsive aspect ratio, subtle border, transparent-friendly background (no white boxes).

## Accessibility

Semantic landmarks, cyan focus-visible rings, accessible mobile nav, alt text on images, empty states instead of broken UI. Selection + subtle scrollbar polish in `globals.css`.

## Search (deferred UI)

`src/lib/search.ts` defines a lightweight index shape for a future Cmd/Ctrl+K interface.

## SEO

`src/lib/metadata.ts` builds root + page Open Graph / Twitter metadata and favicon.
