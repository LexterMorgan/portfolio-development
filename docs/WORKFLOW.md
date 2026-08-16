# Workflow

Implementation proceeds in focused phases. Each phase is delivered as **small, explicit milestones** — not one giant change.

## PHASE 0 — Professional positioning and content decisions

Decide positioning, audience, and which projects/articles are in scope. Source materials identified (CV, repos, READMEs). No code required.

## PHASE 1 — Foundation and content architecture

- Repository inspection
- Documentation (`AGENTS.md`, `docs/*`)
- Content folder structure
- Typed schemas + loaders
- Tech registry architecture
- Status / article / updates models
- Validation harness

**Stop condition:** Content can be loaded and validated; no visual design yet.

## PHASE 2 — Design system and visual language

Typography, grid, color tokens, navigation patterns, project composition primitives, tech icon visual system, homepage composition, project/article/about routes, empty states, SEO foundation, restrained motion.

**Stop condition:** Content-driven UI is navigable end-to-end; missing facts use polished empty states rather than invented content.

## PHASE 3 — Frontend art direction & interaction redesign

Locked dark editorial art direction (Newsreader / Source Sans 3 / IBM Plex Mono; cyan accent on near-black navy). Homepage IA, editorial project rows, process/capabilities shells, unified motion language, responsive polish. Content remains loader-driven; empty fields use intentional empty states — no fabricated facts.

Populate sourced profile, experience, project facts, screenshots, and featured work so the homepage and case studies carry verified substance.

## PHASE 4 — Project Explore pages

5W1H case studies, Live/Vercel + GitHub links, tech stack rendering, findings, limitations, analytical integrity sections.

## PHASE 5 — Articles / Insights

Article listing and detail pages; project ↔ article linking via slugs.

## PHASE 6 — Experience / About / Current Focus

Experience, about/beyond-analytics, currently building/learning, upcoming projects.

## PHASE 7 — Responsive and accessibility QA

Responsive layouts, keyboard/focus, contrast, landmarks, reduced-motion respect.

## PHASE 8 — Content and analytical-integrity audit

Claim-by-claim audit against `DATA_SOURCES.md` and `RESEARCH_METHOD.md`. Fix or mark unknowns.

## PHASE 9 — Performance / SEO / final polish

Metadata, OG images, performance budgets, polish that does not invent content.

## PHASE 10 — Human-controlled Git + Vercel deployment

Human reviews, commits, pushes, and deploys. Agents do not push or deploy unless explicitly instructed.

---

### Milestone practice

Within each phase:

1. Agree the milestone scope.
2. Implement the smallest vertical slice.
3. Validate (typecheck / lint / test / content / build as relevant).
4. Human reviews before Git.
5. Only then proceed to the next milestone.
