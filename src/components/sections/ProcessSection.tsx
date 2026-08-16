import { Reveal } from "@/components/ui/Reveal";
import styles from "./ProcessSection.module.css";

const STEPS = [
  {
    title: "Understand",
    body: "Clarify the business question, constraints, and what evidence can actually support.",
  },
  {
    title: "Analyze",
    body: "Structure data work carefully — validate assumptions and keep structural breaks visible.",
  },
  {
    title: "Build",
    body: "Translate analysis into decision-ready views or product surfaces when the problem needs them.",
  },
  {
    title: "Validate",
    body: "Separate observed facts from derived values and unknowns before claiming outcomes.",
  },
] as const;

/**
 * Portfolio working methodology — not a personal claim of employment history.
 */
export function ProcessSection() {
  return (
    <div className={styles.root}>
      <p className={styles.note}>
        Working methodology for the analytical case studies in this portfolio.
      </p>
      <ol className={styles.list}>
        {STEPS.map((step, index) => (
          <Reveal as="li" key={step.title} className={styles.item} delay={index * 60}>
            <p className={styles.index}>{String(index + 1).padStart(2, "0")}</p>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.body}>{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
