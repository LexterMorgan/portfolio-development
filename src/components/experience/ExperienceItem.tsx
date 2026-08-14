import type { ExperienceEntry } from "@/content";
import styles from "./ExperienceItem.module.css";

export function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  const period = [entry.start, entry.end].filter(Boolean).join(" — ");
  return (
    <article className={styles.item}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{entry.title}</h3>
          {entry.organization ? (
            <p className={styles.org}>{entry.organization}</p>
          ) : null}
        </div>
        <div className={styles.side}>
          {period ? <p className={styles.date}>{period}</p> : null}
          {entry.location ? <p className={styles.loc}>{entry.location}</p> : null}
          <p className={styles.layer}>
            {entry.layer === "additional" ? "Additional" : "Primary"}
          </p>
        </div>
      </div>
      {entry.summary ? <p className={styles.summary}>{entry.summary}</p> : null}
      {entry.highlights.length > 0 ? (
        <ul className={styles.highlights}>
          {entry.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
