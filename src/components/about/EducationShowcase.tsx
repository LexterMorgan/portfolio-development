import Image from "next/image";
import type { EducationEntry } from "@/content";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/Label";
import styles from "./EducationShowcase.module.css";

type EducationShowcaseProps = {
  entries: EducationEntry[];
};

function EducationCard({
  entry,
  index,
}: {
  entry: EducationEntry;
  index: number;
}) {
  const period = [entry.start, entry.end].filter(Boolean).join(" — ");
  const credential = [entry.credential, entry.field].filter(Boolean).join(" · ");

  return (
    <Reveal as="li" className={styles.card} delay={index * 80} cursor="card">
      {entry.logo ? (
        <div className={styles.logoWrap}>
          <Image
            src={entry.logo}
            alt=""
            width={64}
            height={64}
            className={styles.logo}
          />
        </div>
      ) : (
        <div className={styles.mark} aria-hidden>
          {entry.institution.slice(0, 1)}
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.top}>
          <h3 className={styles.institution}>{entry.institution}</h3>
          {period ? <p className={styles.date}>{period}</p> : null}
        </div>
        {credential ? <p className={styles.credential}>{credential}</p> : null}
        {entry.summary ? <p className={styles.summary}>{entry.summary}</p> : null}
        {entry.highlights.length > 0 ? (
          <ul className={styles.highlights}>
            {entry.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </Reveal>
  );
}

export function EducationShowcase({ entries }: EducationShowcaseProps) {
  if (entries.length === 0) {
    return (
      <EmptyState
        title="Education pending"
        description="Add sourced education entries to content/education.md. Cards appear here when verified."
      />
    );
  }

  return (
    <ul className={styles.list}>
      {entries.map((entry, index) => (
        <EducationCard key={entry.id} entry={entry} index={index} />
      ))}
    </ul>
  );
}
