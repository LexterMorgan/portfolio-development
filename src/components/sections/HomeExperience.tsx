import type { ExperienceEntry } from "@/content";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/Label";
import { TextLink } from "@/components/ui/TextLink";
import styles from "./HomeExperience.module.css";

type HomeExperienceProps = {
  entries: ExperienceEntry[];
  /** Max roles to show on Home */
  limit?: number;
};

/**
 * Compact professional snapshot for Home — full timeline lives on About.
 * Layout: metadata column (~28%) + content column (~72%).
 */
export function HomeExperience({ entries, limit = 3 }: HomeExperienceProps) {
  if (entries.length === 0) {
    return (
      <EmptyState
        title="Experience pending"
        description="Verified roles appear here once added to content/experience.md."
      />
    );
  }

  const items = entries.slice(0, limit);

  return (
    <div className={styles.root}>
      <ol className={styles.list}>
        {items.map((entry, index) => {
          const period = [entry.start, entry.end].filter(Boolean).join(" — ");
          return (
            <Reveal
              as="li"
              key={entry.id}
              className={styles.item}
              delay={index * 60}
              cursor="card"
            >
              <div className={styles.meta}>
                <span className={styles.node} aria-hidden />
                {period ? <p className={styles.date}>{period}</p> : null}
              </div>
              <div className={styles.copy}>
                <h3 className={styles.title}>{entry.title}</h3>
                {entry.organization ? (
                  <p className={styles.org}>{entry.organization}</p>
                ) : null}
                {entry.summary ? (
                  <p className={styles.summary}>{entry.summary}</p>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </ol>
      <TextLink href="/about#experience" arrow>
        Full experience
      </TextLink>
    </div>
  );
}
