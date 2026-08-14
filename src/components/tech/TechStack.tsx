import { flattenTechIds } from "@/lib/format";
import type { TechStack } from "@/content";
import { TechBadge } from "./TechBadge";
import styles from "./TechStack.module.css";

type TechStackProps = {
  stack: TechStack;
  showDescriptions?: boolean;
  labeled?: boolean;
};

export function TechStackList({
  stack,
  showDescriptions = false,
  labeled = false,
}: TechStackProps) {
  const ids = flattenTechIds(stack);
  if (ids.length === 0) {
    return (
      <p className={styles.empty}>
        Technology stack pending source verification.
      </p>
    );
  }

  if (labeled) {
    const entries = Object.entries(stack).filter(
      ([, list]) => (list?.length ?? 0) > 0,
    ) as Array<[string, string[]]>;
    return (
      <div className={styles.labeled}>
        {entries.map(([category, list]) => (
          <div key={category} className={styles.group}>
            <p className={styles.category}>{category}</p>
            <ul className={styles.list}>
              {list.map((id) => (
                <li key={id}>
                  <TechBadge
                    id={id}
                    showDescription={showDescriptions}
                    size={showDescriptions ? "md" : "sm"}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {ids.map((id) => (
        <li key={id}>
          <TechBadge
            id={id}
            showDescription={showDescriptions}
            size={showDescriptions ? "md" : "sm"}
          />
        </li>
      ))}
    </ul>
  );
}
