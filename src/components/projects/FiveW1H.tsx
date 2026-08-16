import type { FiveW1H } from "@/content";
import styles from "./FiveW1H.module.css";

const FIELDS: Array<{ key: keyof FiveW1H; label: string }> = [
  { key: "what", label: "What" },
  { key: "why", label: "Why" },
  { key: "who", label: "Who" },
  { key: "when", label: "When" },
  { key: "where", label: "Where" },
  { key: "how", label: "How" },
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
    <div className={styles.list}>
      {present.map((field) => (
        <article key={field.key} className={styles.item}>
          <p className={styles.label}>{field.label}</p>
          <p className={styles.body}>{data[field.key]}</p>
        </article>
      ))}
    </div>
  );
}
