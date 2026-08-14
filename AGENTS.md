# Agent Rules — Portfolio Development

Repository-wide rules for any AI agent (Cursor, ChatGPT planning assistants, or future automation) working in this codebase.

## Roles

| Role | Responsibility |
|------|----------------|
| **Human** | Source of truth for personal facts, Git, and deployment decisions |
| **ChatGPT** | Planning, architecture, analysis, review, and decision-making |
| **Cursor** | Implementation against agreed plans |

**Workflow:** Human → ChatGPT → Cursor → validation → human-controlled Git/deployment.

## Mandatory rules

1. **Inspect before modifying.** Read the relevant files, docs, and existing content before changing anything.
2. **Work in small, explicit milestones.** Prefer focused diffs over giant one-shot rewrites.
3. **Do not fabricate personal information.** Never invent project metrics, technologies, results, employers, dates, achievements, or biographical details.
4. **Traceable claims only.** Portfolio claims must be traceable to provided source material or existing project repositories (see `docs/DATA_SOURCES.md`).
5. **UNKNOWN ≠ ZERO.** Do not turn unknown values into zero, empty success metrics, or placeholder “wins.”
6. **No unsupported causal claims.** Do not assert business impact or causation unless the source project supports it.
7. **Preserve analytical limitations.** Keep structural breaks, caveats, and limitations visible in case studies.
8. **Separate evidence categories.** Clearly distinguish observed facts, derived values, assumptions, and unknowns (`docs/RESEARCH_METHOD.md`).
9. **Content ≠ presentation.** Keep editorial/content data in `content/` (or equivalent); keep UI in components/pages.
10. **Prefer reusable components** over duplicated page-specific components — but only when reuse is real.
11. **Avoid premature abstractions.** Do not invent frameworks, helpers, or layers until a second use case exists.
12. **Avoid unnecessary dependencies.** Add packages only when genuinely required.
13. **Preserve working functionality.** Do not break existing routes, loaders, or builds to chase polish.
14. **Validate after meaningful changes.** Run typecheck, lint, tests, content validation, and/or production build as appropriate.
15. **Git is human-controlled.** Do not commit, amend, force-push, or push unless the human explicitly instructs it.
16. **Do not rewrite Git history** unless the human explicitly requests a documented recovery step.
17. **Do not alter application data** merely to make the portfolio look better.
18. **Missing information stays unresolved.** Leave gaps explicit; do not invent filler content.

## Content integrity

- Project technologies should be verified against the actual repository when possible before listing in a stack.
- Articles must link to projects via stable slugs/IDs, not hardcoded page wiring.
- Status (`idea` | `planned` | `in-progress` | `completed` | `archived`) and `featured` drive future homepage sections — do not fake status to pad “Selected Work.”

## Phase discipline

This repository is built in numbered phases (`docs/WORKFLOW.md`). Do not jump ahead into visual design, homepage polish, or deployment unless the current phase explicitly includes that work.

## Validation expectations

After implementation milestones, prefer:

```bash
npm run typecheck
npm run lint
npm run test
npm run validate:content
npm run build
```

Skip only what does not yet exist; never skip validation silently after content/schema changes.
