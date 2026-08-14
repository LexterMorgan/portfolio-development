import type { Finding } from "@/content";
import styles from "./Findings.module.css";

export function FindingsList({ findings }: { findings: Finding[] }) {
  if (findings.length === 0) {
    return (
      <p className={styles.empty}>
        Findings will appear once observed or properly derived from sources.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {findings.map((finding, index) => (
        <li key={`${finding.summary}-${index}`} className={styles.item}>
          <span className={styles.evidence}>{finding.evidence}</span>
          <p className={styles.summary}>{finding.summary}</p>
          {finding.source ? (
            <p className={styles.source}>Source: {finding.source}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function LimitationsList({ limitations }: { limitations: string[] }) {
  if (limitations.length === 0) {
    return (
      <p className={styles.empty}>
        Limitations section pending — analytical caveats will be listed here.
      </p>
    );
  }

  return (
    <ul className={styles.limitations}>
      {limitations.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
