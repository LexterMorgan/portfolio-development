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

Typography, grid, color tokens, navigation patterns, project composition primitives, tech icon visual system. Still no full homepage narrative polish until Phase 3 if preferred as a milestone split.

## PHASE 3 — Homepage

Composition for positioning, selected work, currently building, and entry points — driven by content status/featured flags.

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
