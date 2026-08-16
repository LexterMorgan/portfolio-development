import type { RecognitionEntry } from "@/content";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./RecognitionList.module.css";

type RecognitionListProps = {
  entries: RecognitionEntry[];
};

/**
 * Awards & certifications rows. Caller should omit the section when empty.
 */
export function RecognitionList({ entries }: RecognitionListProps) {
  if (entries.length === 0) return null;

  return (
    <ul className={styles.list}>
      {entries.map((entry, index) => {
        const content = (
          <>
            <div className={styles.main}>
              <h3 className={styles.title}>{entry.title}</h3>
              {entry.issuer ? (
                <p className={styles.issuer}>{entry.issuer}</p>
              ) : null}
            </div>
            {entry.year !== undefined ? (
              <p className={styles.year}>{entry.year}</p>
            ) : null}
          </>
        );

        return (
          <Reveal as="li" key={entry.id} className={styles.item} delay={index * 40} cursor="card">
            {entry.url ? (
              <a
                href={entry.url}
                className={styles.row}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            ) : (
              <div className={styles.row}>{content}</div>
            )}
          </Reveal>
        );
      })}
    </ul>
  );
}
