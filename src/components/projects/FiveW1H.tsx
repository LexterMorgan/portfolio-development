import type { FiveW1H } from "@/content";
import styles from "./FiveW1H.module.css";

const FIELDS: Array<{ key: keyof FiveW1H; label: string; prompt: string }> = [
  { key: "what", label: "What", prompt: "What was built or analyzed?" },
  { key: "why", label: "Why", prompt: "Why did the problem matter?" },
  { key: "who", label: "Who", prompt: "Who is the stakeholder or audience?" },
  { key: "when", label: "When", prompt: "What timeframe is relevant?" },
  { key: "where", label: "Where", prompt: "What domain or context applies?" },
  { key: "how", label: "How", prompt: "How was it analyzed and implemented?" },
];

export function FiveW1HNarrative({ data }: { data: FiveW1H }) {
  const present = FIELDS.filter((field) => Boolean(data[field.key]?.trim()));
  if (present.length === 0) {
    return (
      <p className={styles.empty}>
        5W1H narrative pending verified project documentation.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {present.map((field) => (
        <article key={field.key} className={styles.item}>
          <p className={styles.label}>{field.label}</p>
          <p className={styles.prompt}>{field.prompt}</p>
          <p className={styles.body}>{data[field.key]}</p>
        </article>
      ))}
    </div>
  );
}
