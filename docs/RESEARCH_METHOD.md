# Research Method — Analytical Integrity

Rules for writing and reviewing portfolio case studies and insights.

## Evidence categories

| Category | Meaning |
|----------|---------|
| **OBSERVED** | Directly supported by source material or project output |
| **DERIVED** | Calculated from observed information with a stated method |
| **ASSUMPTION** | Explicit modeling or contextual assumption |
| **UNKNOWN** | Unavailable or unsupported information |

## Hard rules

1. **UNKNOWN ≠ ZERO.** Missing values are not zeros, empty wins, or silent omissions dressed as completeness.
2. **Correlation ≠ causation.** Do not imply causal business impact from correlational analysis unless the project design supports it.
3. **Structural breaks stay visible.** Regime changes, data gaps, and pipeline breaks must not be smoothed away in narrative.
4. **Supporting evidence ≠ primary evidence.** Secondary context must not be presented as the main finding.
5. **Do not exaggerate business impact.** No inflated ROI, “drove revenue,” or stakeholder praise without sources.
6. **No unverified production claims.** Do not claim production usage, SLAs, or live user counts unless supported.
7. **No unverified measurable outcomes.** Percent lifts, accuracy scores, and savings appear only when observed or properly derived.

## Writing practice

For each non-trivial claim in an Explore page:

1. State the claim.
2. Tag it OBSERVED / DERIVED / ASSUMPTION / UNKNOWN.
3. Point to the source (repo path, README section, CV line, user note).
4. If UNKNOWN — leave unresolved; do not invent.

## Limitations section

Every completed analytical project page should eventually include an honest **Limitations** section. Absence of limitations is a documentation smell, not a quality signal.

## Review checklist (Phase 8)

- [ ] Every metric has a category tag and source
- [ ] Tech stack verified against repo where possible
- [ ] Live/GitHub links resolve (or are omitted)
- [ ] Articles reference real project slugs
- [ ] No skill percentages
- [ ] No fabricated biography
