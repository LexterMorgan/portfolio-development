import { Reveal } from "@/components/ui/Reveal";
import styles from "./AboutProcess.module.css";

const STEPS = [
  {
    title: "Discovery",
    body: "Understand the problem, context, stakeholders, and what data can actually support.",
  },
  {
    title: "Analysis",
    body: "Clean, explore, structure, and analyze data to identify meaningful patterns — with assumptions visible.",
  },
  {
    title: "Build",
    body: "Turn analysis into dashboards, models, data products, or usable interfaces when the problem needs them.",
  },
  {
    title: "Communicate",
    body: "Translate technical findings into clear insights and decisions without overstating certainty.",
  },
] as const;

/**
 * Analytical workflow for the About page — methodology, not employment claims.
 */
export function AboutProcess() {
  return (
    <ol className={styles.list}>
      {STEPS.map((step, index) => (
        <Reveal as="li" key={step.title} className={styles.card} delay={index * 70}>
          <div className={styles.top}>
            <p className={styles.index}>{String(index + 1).padStart(2, "0")}</p>
          </div>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.body}>{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
