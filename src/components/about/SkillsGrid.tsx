import type { SkillGroup } from "@/content";
import { getTech } from "@/content";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/Label";
import { TechIcon } from "./TechIcon";
import styles from "./SkillsGrid.module.css";

type SkillsGridProps = {
  groups: SkillGroup[];
};

/**
 * Categorized stack presentation for About — sourced from content/skills.md.
 */
export function SkillsGrid({ groups }: SkillsGridProps) {
  const visible = groups.filter((group) => group.technologies.length > 0);

  if (visible.length === 0) {
    return (
      <EmptyState
        title="Skills pending"
        description="Add verified technology groups to content/skills.md."
      />
    );
  }

  return (
    <div className={styles.grid}>
      {visible.map((group, index) => {
        const items = group.technologies
          .map((id) => ({ id, name: getTech(id)?.name ?? id }))
          .filter((item) => Boolean(item.name));

        return (
          <Reveal
            key={group.id}
            className={styles.card}
            delay={Math.min(index * 60, 240)}
            cursor="card"
          >
            <p className={styles.label}>{group.label}</p>
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <TechIcon id={item.id} />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  );
}
