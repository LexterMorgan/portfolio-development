# Data Sources

Legitimate inputs for portfolio content. Anything not listed here is **not** a source of truth.

## SOURCE MATERIAL (authoritative)

| Source | Use for |
|--------|---------|
| Current master CV | Education, experience titles/dates, skills claims when present |
| Existing project repositories | Tech stack verification, README facts, architecture |
| Project READMEs | Overview, setup, stated goals/limitations |
| Project documentation | Methodology, data notes, known caveats |
| Project datasets/outputs **when explicitly provided** | Findings that are observed in those outputs |
| Existing portfolio / site references | Prior published wording (still re-verify) |
| User-provided information | Anything the human states explicitly in chat or files |

## MODEL INFERENCE (non-authoritative)

Model suggestions, “typical stack” guesses, and inferred business impact are **not** portfolio facts.

| Allowed | Not allowed |
|---------|-------------|
| Propose questions to ask the human | Fill empty fields with plausible fiction |
| Flag inconsistencies between CV and repo | Invent metrics to “complete” a case study |
| Suggest structure for UNKNOWN sections | Convert UNKNOWN → 0 or “N/A success” |
| Draft copy marked as draft pending verification | Publish unverified employer/impact claims |

## Technology stack rule

Prefer verifying the **actual repository** (package manifests, notebooks, SQL, infra files, README) before listing a technology in `tech_stack`.

If verification is pending, either:

- omit the technology, or
- leave an explicit UNKNOWN / TODO in content notes — do not invent.

## Evidence labeling

When writing case-study findings, label per `docs/RESEARCH_METHOD.md`:

- OBSERVED
- DERIVED
- ASSUMPTION
- UNKNOWN

## Phase 1 status of sources

As of Phase 1 foundation:

- Project **slugs** are reserved for known project folders.
- Project **facts** (metrics, stack details, results) are **not** populated until sourced.
- Profile/experience/education bodies may remain intentionally sparse.
