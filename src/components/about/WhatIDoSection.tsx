import { Reveal } from "@/components/ui/Reveal";
import styles from "./WhatIDoSection.module.css";

/**
 * Capability framing for the About page — portfolio domains, not fabricated stats.
 * Aligned to the approved positioning: Data Science / Analytics / BI / data products.
 */
const CAPABILITIES = [
  {
    title: "Data Analytics",
    body: "Frame questions carefully, explore evidence, and surface patterns that decision-makers can trust.",
  },
  {
    title: "Business Intelligence",
    body: "Translate analysis into decision-ready views without overstating certainty or hiding limitations.",
  },
  {
    title: "Data Products",
    body: "Shape analytical work into usable interfaces and workflows when the problem needs a product surface.",
  },
  {
    title: "Data & SQL Workflows",
    body: "Structure queries and analytical pipelines with assumptions visible and structural breaks preserved.",
  },
] as const;

export function WhatIDoSection() {
  return (
    <div className={styles.layout}>
      <Reveal className={styles.intro}>
        <h2 className={styles.headline}>
          Turning complex data
          <br />
          into clear decisions
        </h2>
        <p className={styles.lede}>
          Work across analytics, business intelligence, and data product surfaces —
          with evidence labeled and unknowns left unresolved rather than invented.
        </p>
      </Reveal>

      <ul className={styles.grid}>
        {CAPABILITIES.map((item, index) => (
          <Reveal
            as="li"
            key={item.title}
            className={styles.card}
            delay={index * 60}
            cursor="card"
          >
            <p className={styles.index}>{String(index + 1).padStart(2, "0")}</p>
            <span className={styles.icon} aria-hidden>
              ◇
            </span>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.body}>{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
