import Image from "next/image";
import type { ExperienceEntry } from "@/content";
import { getTech } from "@/content";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/Label";
import styles from "./ExperienceTimeline.module.css";

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
};

function period(entry: ExperienceEntry): string {
  return [entry.start, entry.end].filter(Boolean).join(" — ");
}

function ExperienceNode({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  const techNames = entry.technologies
    .map((id) => getTech(id)?.name)
    .filter(Boolean) as string[];

  return (
    <Reveal as="li" className={styles.item} delay={Math.min(index * 70, 280)} cursor="card">
      <div className={styles.rail} aria-hidden>
        <span className={styles.node} />
      </div>

      <article className={styles.card}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <h3 className={styles.title}>{entry.title}</h3>
            {entry.organization ? (
              <p className={styles.org}>{entry.organization}</p>
            ) : null}
          </div>
          <div className={styles.meta}>
            {period(entry) ? (
              <p className={styles.date}>{period(entry)}</p>
            ) : null}
            {entry.location ? (
              <p className={styles.loc}>{entry.location}</p>
            ) : null}
          </div>
        </header>

        {entry.summary ? <p className={styles.summary}>{entry.summary}</p> : null}

        {entry.highlights.length > 0 ? (
          <ul className={styles.highlights}>
            {entry.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {(techNames.length > 0 || entry.practice_groups.length > 0) && (
          <div className={styles.stack}>
            {techNames.length > 0 ? (
              <div className={styles.stackGroup}>
                <p className={styles.stackLabel}>Tools</p>
                <p className={styles.stackItems}>{techNames.join(" · ")}</p>
              </div>
            ) : null}
            {entry.practice_groups.map((group) =>
              group.items.length > 0 ? (
                <div key={group.label} className={styles.stackGroup}>
                  <p className={styles.stackLabel}>{group.label}</p>
                  <p className={styles.stackItems}>{group.items.join(" · ")}</p>
                </div>
              ) : null,
            )}
          </div>
        )}

        {entry.image ? (
          <div className={styles.preview}>
            <Image
              src={entry.image}
              alt=""
              width={720}
              height={420}
              className={styles.previewImage}
            />
          </div>
        ) : null}
      </article>
    </Reveal>
  );
}

/**
 * Vertical editorial timeline for sourced experience entries.
 */
export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  if (entries.length === 0) {
    return (
      <EmptyState
        title="Experience pending"
        description="Add sourced roles to content/experience.md. The timeline architecture is ready — entries appear here without fabrication."
      />
    );
  }

  return (
    <ol className={styles.list}>
      {entries.map((entry, index) => (
        <ExperienceNode key={entry.id} entry={entry} index={index} />
      ))}
    </ol>
  );
}
