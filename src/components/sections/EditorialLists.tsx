import type { ExperienceEntry, EducationEntry, SkillGroup } from "@/content";
import { Reveal } from "@/components/ui/Reveal";
import { TechBadge } from "@/components/tech/TechBadge";
import { EmptyState } from "@/components/ui/Label";
import styles from "./EditorialLists.module.css";

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  if (entries.length === 0) {
    return (
      <EmptyState
        title="Experience pending sourced entries"
        description="Add verified roles in content/experience.md. Nothing is invented here."
      />
    );
  }

  return (
    <ol className={styles.timeline}>
      {entries.map((entry, index) => (
        <Reveal as="li" key={entry.id} className={styles.row} delay={index * 50}>
          <p className={styles.when}>
            {[entry.start, entry.end].filter(Boolean).join(" — ") || "Dates pending"}
          </p>
          <div className={styles.detail}>
            <h3 className={styles.role}>{entry.title}</h3>
            {entry.organization ? (
              <p className={styles.org}>{entry.organization}</p>
            ) : null}
            {entry.summary ? <p className={styles.summary}>{entry.summary}</p> : null}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function EducationList({ entries }: { entries: EducationEntry[] }) {
  if (entries.length === 0) {
    return (
      <EmptyState
        title="Education pending sourced entries"
        description="Add verified credentials in content/education.md."
      />
    );
  }

  return (
    <ol className={styles.timeline}>
      {entries.map((entry, index) => (
        <Reveal as="li" key={entry.id} className={styles.row} delay={index * 50}>
          <p className={styles.when}>
            {[entry.start, entry.end].filter(Boolean).join(" — ") || "Year pending"}
          </p>
          <div className={styles.detail}>
            <h3 className={styles.role}>
              {[entry.credential, entry.field].filter(Boolean).join(" · ") ||
                "Credential pending"}
            </h3>
            <p className={styles.org}>{entry.institution}</p>
            {entry.summary ? <p className={styles.summary}>{entry.summary}</p> : null}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function CapabilitiesFromSkills({ groups }: { groups: SkillGroup[] }) {
  if (groups.length === 0) {
    return (
      <EmptyState
        title="Capabilities pending verified skills"
        description="Populate content/skills.md with registry tech IDs only — no proficiency bars."
      />
    );
  }

  return (
    <div className={styles.caps}>
      {groups.map((group, index) => (
        <Reveal key={group.id} className={styles.capGroup} delay={index * 40}>
          <p className={styles.capLabel}>{group.label}</p>
          <ul className={styles.capList}>
            {group.technologies.map((id) => (
              <li key={id}>
                <TechBadge id={id} size="sm" />
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
