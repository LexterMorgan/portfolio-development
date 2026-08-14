# Product Requirements Document (PRD)

## Positioning

**Data Science Graduate | Data Analytics | Business Intelligence**

The site should feel like a living personal/editorial work journal — not a generic developer portfolio, template site, corporate resume page, or skill-percentage gallery.

## Goals

Communicate, with integrity:

- Data Science foundation
- Data Analytics capability
- Business Intelligence capability
- Real project work
- Technical implementation
- Analytical thinking
- Professional experience
- Writing / project insights
- Continuous development

## Non-goals (explicit)

- Fabricating metrics, technologies, employers, or outcomes
- Skill bars / arbitrary proficiency percentages
- Template-looking “hero + cards + logos” portfolio clichés (visual language is Phase 2+)
- CMS/database complexity for V1

## Primary audience

- Recruiters
- Hiring managers
- Data / BI leads
- Technical interviewers
- Potential collaborators

## Core project interaction

Each project must eventually provide three actions:

| Action | Intent |
|--------|--------|
| **EXPLORE** | Full case-study page (5W1H) |
| **LIVE / VERCEL** | Live deployment when available |
| **GITHUB** | Source repository |

### Explore page structure (5W1H)

- **WHAT** — what the project is
- **WHY** — problem / motivation
- **WHO** — audience / stakeholders (when known)
- **WHEN** — timeframe (when known)
- **WHERE** — domain / context (when known)
- **HOW** — methodology and technical implementation

### Explore page content (eventual)

- Project overview
- Problem / context
- Objectives
- Data
- Methodology
- Technical implementation
- Tech stack
- Findings / results
- Limitations
- Analytical integrity notes
- Relevant visual artifacts
- Related articles / insights
- GitHub repository
- Live deployment (when available)

## Content domains

Articles / Insights are **first-class** and must connect to their originating project via stable slugs.

The architecture must support future:

- Upcoming / in-progress / completed / archived projects
- Articles and project insights
- Experiments / playground
- Current focus (“Currently”)
- Changelog / updates

Not all of these are implemented in Phase 1; the content model must allow them without rewriting the main UI.

## Success criteria (product)

1. A visitor understands the professional positioning within one scroll of truthful content.
2. Every claim on a project page is traceable to source material or marked unknown.
3. New projects and articles can be added via content files without UI rewrites.
4. Selected Work / Currently Building / Archived can be derived from `status` + `featured`.

## Out of scope for Phase 1

- Final visual design
- Homepage UI composition
- Animations / polish
- Deployment
- Populating unverified personal or project facts
