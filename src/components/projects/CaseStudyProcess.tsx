import { Reveal } from "@/components/ui/Reveal";
import styles from "./CaseStudyProcess.module.css";

const DEFAULT_STEPS = [
  {
    title: "Understand",
    body: "Clarify the business question, stakeholders, and what evidence can support.",
  },
  {
    title: "Prepare",
    body: "Collect, clean, and structure data while keeping assumptions visible.",
  },
  {
    title: "Analyze",
    body: "Explore patterns carefully and separate observed facts from derived values.",
  },
  {
    title: "Build",
    body: "Translate analysis into dashboards, models, or usable product surfaces.",
  },
  {
    title: "Communicate",
    body: "Present findings clearly — with limitations and unknowns preserved.",
  },
] as const;

/**
 * Generic analytical case-study process — methodology framing, not project claims.
 */
export function CaseStudyProcess() {
  return (
    <ol className={styles.list}>
      {DEFAULT_STEPS.map((step, index) => (
        <Reveal as="li" key={step.title} className={styles.item} delay={index * 50}>
          <p className={styles.index}>{String(index + 1).padStart(2, "0")}</p>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.body}>{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
